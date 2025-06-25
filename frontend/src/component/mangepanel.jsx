import { Plus, Edit, Trash2,Video  } from 'lucide-react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function Manage(){
    let {isAuthenticated}=useSelector((state)=>state.auth);
    const adminOptions = [
    {
      id: 'create',
      title: 'Add Place',
      description: 'Add a new exciting place ',
      icon: Plus,
      color: 'btn-success',
      bgColor: 'bg-success/10',
      route: 'create'
    },
    {
      id: 'update',
      title: 'Edit Details',
      description: 'Edit and delete existing place and their details',
      icon: Edit,
      color: 'btn-warning',
      bgColor: 'bg-warning/10',
      route: 'update'
    },
    // {
    //   id: 'delete',
    //   title: 'Delete Place',
    //   description: 'Remove place from the platform',
    //   icon: Trash2,
    //   color: 'btn-error',
    //   bgColor: 'bg-error/10',
    //   route: 'delete'
    // },
    
    
    ];

     return (
          <>
        <div className="text-4xl font-bold flex justify-center mt-5 mb-3">Manage Panel</div>
        <div className="flex flex-wrap justify-center gap-5 mt-10 mb-20">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="card bg-base-100 w-80 h-75 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="card-body items-center text-center p-8">
                  
                  <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
                    <IconComponent size={32} className="text-base-content" />
                  </div>
                
                  <h2 className="card-title text-xl mb-2">
                    {option.title}
                  </h2>
                  
                  <p className="text-base-content/70 mb-6">
                    {option.description}
                  </p>
                  
               
                  <div className="card-actions">
                    <div className="card-actions">
                    <NavLink 
                    to={option.route}
                   className={`btn ${option.color} btn-wide`}
                   >
                   {option.title}
                   </NavLink>
                   </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </>
     )
}
export default Manage;