import React, { useEffect, useState } from 'react';
//import { Calendar } from 'lucide-react';
import Sidebar from '../sidebar/Sidebar';
import './AddEquipment.css';
import SubCategoryModal from './add-sub_category/SubCategoryModal';
import CategoryModal from './add-category/CategoryModal';
import { toast, ToastContainer} from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { URLS } from '../URLS';


/*const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};*/

const parseDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${year}-${month}-${day}`;
};


interface Category {
  id: number;
  nom: string;
}

interface SubCategory {
  id: number;
  nom: string;
  category_id: number;
}

interface CategoriesAndSubCategories {
  sub_category_id: number;
  sub_category_name: string;
  category_id: number;
  category_name: string;
}

interface FormData {
  nom: string;
  sub_category: string;
  category: string;
  prix: string;
  type: 'loue' | 'achete';
  code_bar: string;
  RFID: string;
  details: string;
  date_achat: string;
  date_location: string;
  date_retour: string;
  quantite: string;
  agence_id: string;
}

export default function AddEquipment() {
  
  const location = useLocation();
  

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    sub_category: '',
    category: '',
    prix: '',
    type: 'achete',
    code_bar: '',
    RFID: '',
    details: '',
    date_achat: '',
    date_location: '',
    date_retour: '',
    quantite: '1',
    agence_id: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    
    if (value === "addNewSubCategory") {
      setIsSubCategoryModalOpen(true);
      e.target.value = formData.sub_category || "";
    } else if(value === "addNewCategory"){
      setIsCategoryModalOpen(true);
      e.target.value = formData.category || "";
    } else {
      handleInputChange(e);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Required fields validation
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    if (!formData.sub_category) {
      newErrors.sub_category = 'La sous-catégorie est requise';
    }
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    if (!formData.prix || Number(formData.prix) <= 0) {
      newErrors.prix = 'Le prix doit être un nombre positif';
    }
    if (!formData.quantite || Number(formData.quantite) < 1) {
      newErrors.quantite = 'La quantité doit être au moins 1';
    }

    // Type-specific validations
    if (formData.type === 'achete' && !formData.date_achat) {
      newErrors.date_achat = 'La date d\'achat est requise pour un équipement acheté';
    }
    if (formData.type === 'loue') {
      if (!formData.date_location) {
        newErrors.date_location = 'La date de location est requise pour un équipement loué';
      }
      if (!formData.date_retour) {
        newErrors.date_retour = 'La date de retour est requise pour un équipement loué';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    try {
      const submitData = {
        nom: formData.nom.trim(),
        sub_category: Number(formData.sub_category),
        category: Number(formData.category),
        prix: Number(formData.prix),
        type: formData.type,
        code_bar: formData.code_bar.trim() || undefined,
        RFID: formData.RFID.trim() || undefined,
        details: formData.details.trim() || undefined,
        date_achat: formData.type === 'achete' ? formData.date_achat : undefined,
        date_location: formData.type === 'loue' ? formData.date_location : undefined,
        date_retour: formData.type === 'loue' ? formData.date_retour : undefined,
        quantite: Number(formData.quantite),
        agence_id: formData.agence_id ? Number(formData.agence_id) : undefined
      };

      console.log('Submitting data:', submitData);

      const response = await fetch(`${URLS.ServerIpAddress}/api/addEquipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add equipment');
      }

      const result = await response.json();
      console.log('Equipment added successfully:', result);
      
      // Reset form
      setFormData({
        nom: '',
        sub_category: '',
        category: '',
        prix: '',
        type: 'achete',
        code_bar: '',
        RFID: '',
        details: '',
        date_achat: '',
        date_location: '',
        date_retour: '',
        quantite: '1',
        agence_id: ''
      });
      setErrors({});

      toast.success('Équipement ajouté avec succès!');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Échec de l\'ajout de l\'équipement');
    }
  };

  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const handleSubCategoryAdded = () => {
    getCategoriesAndSubCategories();
  };

  const handleCategoryAdded = () => {
    getCategoriesAndSubCategories();
  };
  


  const [categoriesAndSubCategories, setCategoriesAndSubCategories] = useState<CategoriesAndSubCategories[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const getCategoriesAndSubCategories = async () => {
    try {

      const response = await fetch(`${URLS.ServerIpAddress}/api/getCategory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }
  
      const result = await response.json();

      setCategoriesAndSubCategories(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Échec de la récupération des catégories et sous-catégories');
    }
  };

  const handleCategoriesAndSubCategories = () => {
    const tempCategories:Category[] = [];
    const tempSubCategories:SubCategory[] = [];
    categoriesAndSubCategories.forEach((item:CategoriesAndSubCategories) => {
      if(item.category_id){
        tempCategories.push({id:item.category_id,nom:item.category_name});
      }
      if(item.sub_category_id){
        tempSubCategories.push({id:item.sub_category_id,nom:item.sub_category_name,category_id:item.category_id})
      }
  });
  console.log(tempCategories);
  console.log(tempSubCategories);
    setCategories(tempCategories);
    setSubCategories(tempSubCategories);
  }

  useEffect(() => {
    getCategoriesAndSubCategories();
  }, []);

  useEffect(() => {
    handleCategoriesAndSubCategories();
  }, [categoriesAndSubCategories]);

  useEffect(() => {
    if(location.state&&location.state.item){
      setFormData({
        nom: location.state.item.nom,
        RFID: location.state.item.RFID,
        category: location.state.item.category_id,
        type: location.state.item.type,
        date_location: location.state.item.date_location,
        date_retour: location.state.item.date_retour,
        prix: location.state.item.prix,
        code_bar: location.state.item.code_bar,
        sub_category: location.state.item.sub_category_id,
        date_achat: location.state.item.date_achat,
        details: location.state.item.details,
        quantite: location.state.item.quantite,
        agence_id: location.state.item.agence_id
      });
    }
    console.log(location.state);
  }, [location.state]);

  return (
    <div className="dashboard-container">
      
      <Sidebar/>
      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Équipement</h1>
        
        {/* Equipment Form Card */}
        <div className="form-card">
          <h2 className="form-title">Ajouter un équipement</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Sélectionner un nom"
                    className={`form-input ${errors.nom ? 'error' : ''}`}
                    value={formData.nom}
                    onChange={handleInputChange}
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">RFID</label>
                  <input
                    type="text"
                    name="RFID"
                    placeholder="Sélectionner un RFID"
                    className="form-input"
                    value={formData.RFID}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Catégorie *</label>
                  <div className="select-wrapper">
                    <select
                      name="category"
                      className={`form-select ${errors.category ? 'error' : ''}`}
                      value={formData.category}
                      onChange={handleCategoryDropdownChange}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category:Category) => (
                        <option key={category.id} value={category.id}>{category.nom}</option>
                      ))}
                      <option value="addNewCategory">+ Ajouter une catégorie</option>
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type *</label>
                  <div className="select-wrapper">
                    <select
                      name="type"
                      className="form-select"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="achete">Acheté</option>
                      <option value="loue">Loué</option>
                    </select>
                  </div>
                </div>

                {formData.type === 'achete' && (
                  <div className="form-group">
                    <label className="form-label">Date d'achat *</label>
                    <input
                      type="date"
                      name="date_achat"
                      className={`form-input ${errors.date_achat ? 'error' : ''}`}
                      value={formData.date_achat}
                      onChange={handleInputChange}
                    />
                    {errors.date_achat && <span className="error-message">{errors.date_achat}</span>}
                  </div>
                )}
                
                {formData.type === 'loue' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Date de location *</label>
                      <input
                        type="date"
                        name="date_location"
                        className={`form-input ${errors.date_location ? 'error' : ''}`}
                        value={formData.date_location}
                        onChange={handleInputChange}
                      />
                      {errors.date_location && <span className="error-message">{errors.date_location}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Date de retour *</label>
                      <input
                        type="date"
                        name="date_retour"
                        className={`form-input ${errors.date_retour ? 'error' : ''}`}
                        value={formData.date_retour}
                        onChange={handleInputChange}
                      />
                      {errors.date_retour && <span className="error-message">{errors.date_retour}</span>}
                    </div>
                  </>
                )}
              </div>
              
              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Prix *</label>
                  <input
                    type="number"
                    name="prix"
                    placeholder="Entrer le prix"
                    className={`form-input ${errors.prix ? 'error' : ''}`}
                    value={formData.prix}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                  {errors.prix && <span className="error-message">{errors.prix}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Code-barres</label>
                  <input
                    type="text"
                    name="code_bar"
                    placeholder="Entrer le code-barres"
                    className="form-input"
                    value={formData.code_bar}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Sous-catégorie *</label>
                  <div className="select-wrapper">
                    <select
                      name="sub_category"
                      className={`form-select ${errors.sub_category ? 'error' : ''}`}
                      value={formData.sub_category}
                      onChange={handleCategoryDropdownChange}
                    >
                      <option value="">Sélectionner une sous-catégorie</option>
                      {subCategories.map((subCategory:SubCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>{subCategory.nom}</option>
                      ))}
                      <option value="addNewSubCategory">+ Ajouter une sous-catégorie</option>
                    </select>
                    {errors.sub_category && <span className="error-message">{errors.sub_category}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantité *</label>
                  <input
                    type="number"
                    name="quantite"
                    placeholder="Entrer la quantité"
                    className={`form-input ${errors.quantite ? 'error' : ''}`}
                    value={formData.quantite}
                    onChange={handleInputChange}
                    min="1"
                  />
                  {errors.quantite && <span className="error-message">{errors.quantite}</span>}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Détails</label>
              <textarea
                name="details"
                placeholder="Entrer les détails"
                rows={4}
                className="form-textarea"
                value={formData.details}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="button-container">
              <button type="submit" className="submit-button">
                + Ajouter l'équipement
              </button>
            </div>
          </form>
        </div>
      </div>

      <SubCategoryModal 
        isOpen={isSubCategoryModalOpen}
        onClose={() => setIsSubCategoryModalOpen(false)}
        onSubCategoryAdded={handleSubCategoryAdded}
        categories={categories}
      />
      
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}