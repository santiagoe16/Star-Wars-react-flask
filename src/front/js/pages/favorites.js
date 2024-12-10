import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";
import { Search } from "react-bootstrap-icons";

export const Favorites = () => {
    const { store, actions } = useContext(Context);
    const searchTerm = useRef(store.search);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Manejar búsqueda
    const handleSearch = () => {
        actions.setSearch(searchTerm?.current?.value?.toLowerCase() || "");
        setCurrentPage(1); 
    };

    // Combina los datos filtrados en una lista global
    const combinedDato = useMemo(() => {
        if (!store.search.trim()) return [];

        return ["characters", "locations", "vehicles", "species"]
            .flatMap((category) => (store[category] || []).map((item) => ({ ...item, category })))
            .filter((item) => item.name.toLowerCase().includes(store.search));
    }, [store.search, store]);

    const dataFavorites = useMemo(()=>{
        return store.favorites
    },[store.favorites])

    // Pagina los datos combinados
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        return dataFavorites.slice(startIndex, endIndex);
    }, [currentPage, dataFavorites]);

    // Total de páginas basado en los datos 
    const totalPages = Math.ceil(dataFavorites.length / itemsPerPage);

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Obtener botones de paginación simplificados
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

        if (endPage - startPage + 1 < maxVisibleButtons) {
            if (startPage > 1) {
                startPage = Math.max(1, startPage - (maxVisibleButtons - (endPage - startPage + 1)));
            } else if (endPage < totalPages) {
                endPage = Math.min(totalPages, endPage + (maxVisibleButtons - (endPage - startPage + 1)));
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    };

    return store.favorites.length > 0 ? (
        <div>
            <h1 className="mb-3 text-capitalize">Favorites</h1>
            <div className="mb-5 result-search">
                {paginatedData.map((favorite,index) => (
                    <Card
                        key={index}
                        name={favorite.name}
                        image={favorite.image}
                        nameCard={favorite.category}
                        id={favorite._id}
                    />
                ))}
            </div>

             {/* Controles de paginación */}
             <div className="pagination d-flex justify-content-center">
                <button
                    className="pagination-buttons-notactive me-2"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage < 2}
                >
                    Primera
                </button>
                <button
                    className="pagination-buttons-notactive me-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage < 2}
                >
                    Anterior
                </button>
                    

                {getPaginationButtons().map((page) => (
                    <button
                        key={page}
                        className={`btn ${
                            currentPage === page ? "pagination-buttons" : "pagination-buttons-notactive"
                        } me-2`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                
                <button
                    className="pagination-buttons-notactive me-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage == totalPages}
                >
                    Siguiente
                </button>
                <button
                    className="pagination-buttons-notactive"
                    onClick={() => handlePageChange(totalPages)}
                >
                    Última
                </button>
            </div>
        </div>
    ) : (
        <div className="text-center d-flex justify-content-center align-items-center w-100 h-75">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
