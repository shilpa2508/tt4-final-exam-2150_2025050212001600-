import React, { useEffect, useState } from 'react';

function EntityList() {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/entity')
            .then(response => response.json())
            .then(data => setEntities(data))
            .catch(error => console.error('Error fetching entities:', error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Entities</h1>
            <ul>
                {entities.map(entity => (
                    <li key={entity.ID} className="mb-2">
                        <div className="p-4 bg-white shadow rounded">
                            <h2 className="text-xl font-semibold">{entity.Name}</h2>
                            <p>{entity.Description}</p>
                            <p className="text-sm text-gray-500">Created on: {new Date(entity.CreatedDate).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EntityList; 