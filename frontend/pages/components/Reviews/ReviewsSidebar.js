import React from 'react'

const ReviewsSidebar = () => {
    return (
        <div className="reviews-sidebar">
                    <div className="reviews-sidebar__header">
                        <h3>Filters</h3>
                    </div>
                    <div className="search-container">
                        <input placeholder="Search Reviews" className="search-bar" type="text" />
                    </div>
                    <select name="sort-by" className="sort-by" required>
                        <option value="" hidden>Sort By</option>
                        <option>Highest Rated</option>
                        <option>Lowest Rated</option>
                        <option>Most Recent</option>
                    </select>
                    <div className="filter-by__rating">
                        <h1>Filter By Rating: </h1>
                        <div className="filter-by__rating-rating"><div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; 34%</span></div>
                        <div className="filter-by__rating-rating"><div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; 33%</span></div>
                        <div className="filter-by__rating-rating"><div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; 20%</span></div>
                        <div className="filter-by__rating-rating"><div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; 7%</span></div>
                        <div className="filter-by__rating-rating"><div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; 6%</span></div>
                    </div>
                </div>
    )
}

export default ReviewsSidebar
