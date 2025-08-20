import React from "react";

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        
        <div className="w-full max-w-7xl mx-auto p-6 bg-white">
            <div className="mb-6 items-center text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Breakable Toy I</h1>
                <p className="text-gray-600">Inventario de productos</p>
            </div>

            <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Buscar Producto</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar por nombre o categoría"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default Search;
