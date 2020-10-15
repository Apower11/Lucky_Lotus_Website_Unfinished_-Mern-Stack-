import React, { useEffect, useState, useContext } from "react";
import Button from "../../../shared/UIElements/Button";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import Modal from "../../../shared/UIElements/Modal";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import Review from "./Review";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./css/feedbackModal.css";

const ReviewsContent = (props) => {
  const [loadedReviews, setLoadedReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [rating, setRating] = useState();
  const [filterRating, setFilterRating] = useState();
  const [review, setReview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [editableRating, setEditableRating] = useState(0);
  const [editableReview, setEditableReview] = useState('');
  const [loadCounter, setLoadCounter] = useState(1);
  const [editableReviewId, setEditableReviewId] = useState('');
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(!showFeedbackModal);
    console.log(auth.user._id);
  };

  const setRatingHandler = (rating) => {
    setRating(rating);
    setEditableRating(rating);
  };

  const setReviewHandler = (review) => {
    setReview(review);
    console.log(review);
  };

  const reviewSubmitHandler = async () => {
    console.log('Review Submit Handler');
    try {
      await sendRequest(
        "http://localhost:5000/api/one/review",
        "POST",
        JSON.stringify({
          rating,
          review,
          postedAt: new Date(),
          author: auth.user._id
        }),
        {
          "Content-Type": "application/json",
        }
      );
      getLoadedReviews();
    } catch (err) {}
    setShowFeedbackModal(false);
  };

  const getLoadedReviews = async () => {
    try {
      const responseData = await sendRequest('http://localhost:5000/api/one/reviews');
      console.log(responseData.reviews);
      setLoadedReviews(responseData.reviews);
      setFilteredReviews(responseData.reviews);
    } catch (err) {
      setLoadedReviews(null);
    }
  };

  useEffect(() => {
    getLoadedReviews();
  }, []);


    useEffect(() => {
      const getAverageRating = async () => {
      let totalRating = loadedReviews.reduce((prev, current) => {
        return prev + current.rating;
      }, 0);
      let averageRating = (totalRating / loadedReviews.length).toFixed(1);
      setAverageRating(averageRating);
    };
    getAverageRating();
    }, [loadedReviews])

    const filterByRating = async rating => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/one/reviews/${rating}`, 'POST', JSON.stringify({
          reviews: filteredReviews
        }), {
          'Content-Type': 'application/json'
        });
        setFilteredReviews(responseData.reviews);
        setFilterRating(rating);
      } catch(err) {
      }
    }

    const searchBySearchTerm = async e => {
      e.preventDefault();
      try {
        let results = await sendRequest(`http://localhost:5000/api/one/reviews/search-by/${searchTerm}`, 'POST', JSON.stringify({
          reviews: filteredReviews
        }), {
          'Content-Type': 'application/json'
        });
        setFilteredReviews(results.reviews);
      } catch (err) {

      }
    }
    const sortByHighestRating = async () => {
      const responseData = await sendRequest(`http://localhost:5000/api/one/reviews/sort/highest-rating`, 'POST', JSON.stringify({
        reviews: filteredReviews
      }), {
        'Content-Type': 'application/json'
      });
      setFilteredReviews(responseData.reviews);
    }
    const sortByLowestRating = async () => {
      const responseData = await sendRequest(`http://localhost:5000/api/one/reviews/sort/lowest-rating`, 'POST', JSON.stringify({
        reviews: filteredReviews
      }), {
        'Content-Type': 'application/json'
      });
      setFilteredReviews(responseData.reviews);
    }
    const sortReviewsHandler = async e => {
      console.log(e.target.value);
      if(e.target.value === "Highest Rated") {
        sortByHighestRating();
      } else if(e.target.value === "Lowest Rated") {
        sortByLowestRating();
      } else {
        return loadedReviews;
      }
    }

    const deleteReviewHandler = async id => {
      try {
        console.log(id);
        await sendRequest(`http://localhost:5000/api/one/reviews/${id}`, 'DELETE');
        getLoadedReviews();
      } catch(err) {

      }
    }
    const cancelFilterHandler = async () => {
      setFilterRating(0);
      getLoadedReviews();
    }
    const editReviewHandler = async (rating, review, id) => {
      setEditableRating(rating);
      setEditableReview(review);
      setEditableReviewId(id);
      setEditMode(true);
      toggleFeedbackModal();
    }
    const addReviewFeedbackModal = async () => {
      setEditableRating(0);
      setEditableReview('');
      setEditMode(false);
      toggleFeedbackModal();
    }
    const reviewEditHandler = async () => {
      console.log('Review Edit Handler');
      try {
        await sendRequest(
          `http://localhost:5000/api/one/review/edit-review/${editableReviewId}`,
          "PATCH",
          JSON.stringify({
            rating,
            reviewContent: review,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setEditMode(false);
        setEditableRating(0);
      setEditableReview('');
      setEditableReviewId('');
        getLoadedReviews();
      } catch (err) {}
      setShowFeedbackModal(false);
    }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        className={`feedback-modal ${!showFeedbackModal && "modal-close"}`}
        contentClass="feedback-modal__content"
        show={showFeedbackModal}
        onCancel={closeFeedbackModal}
        header={"Give Us Feedback"}
        footer={""}
      >
        <h1>Rating:</h1>
        <div className="rating">
          <label>
            <input
              type="radio"
              name="stars"
              value="1"
              checked={editableRating === 1 && true}
              onClick={() => setRatingHandler(1)}
            />
            <span className="icon">★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="2"
              checked={editableRating === 2 && true}
              onClick={() => setRatingHandler(2)}
            />
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="3"
              checked={editableRating === 3 && true}
              onClick={() => setRatingHandler(3)}
            />
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="4"
              checked={editableRating === 4 && true}
              onClick={() => setRatingHandler(4)}
            />
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
          <label>
            <input
              type="radio"
              name="stars"
              value="5"
              checked={editableRating === 5 && true}
              onClick={() => setRatingHandler(5)}
            />
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
        </div>
        <div className="feedback-description">
          <textarea
            onChange={(e) => setReviewHandler(e.target.value)}
            id="message"
            placeholder="Review..."
            defaultValue={editableReview}
          ></textarea>
        </div>
        <Button onClick={editMode ? reviewEditHandler : reviewSubmitHandler} type="submit">
          Leave Review
        </Button>
      </Modal>
      <div className="average-rating__container">
        <h1 className="average-rating__container-header">
          Average Rating / Lucky Lotus
        </h1>
        <div id="average-rating" className="average-rating">
          {!isNaN(averageRating) ? <React.Fragment>
            <div className="headings">
            <h1>{averageRating}</h1>
            <h3>Out of 5 Stars</h3>
          </div>
          <div className="stars">
            <span className={`fa fa-star ${averageRating >= 1 && 'checked'}`}></span>
            <span className={`fa fa-star ${averageRating >= 2 && 'checked'}`}></span>
            <span className={`fa fa-star ${averageRating >= 3 && 'checked'}`}></span>
            <span className={`fa fa-star ${averageRating >= 4 && 'checked'}`}></span>
            <span className={`fa fa-star ${averageRating >= 5 && 'checked'}`}></span>
          </div>
          </React.Fragment> : <LoadingSpinner asOverlay />}
        </div>
        <div className="average-rating__button-container">
          <Button onClick={toggleFeedbackModal}>Give Us Feedback</Button>
        </div>
        <div className="reviews">
          {isLoading && <LoadingSpinner className="center" />}
          { filteredReviews.length === 1 && !isLoading && (
            <Review key={filteredReviews[0].id}  review={filteredReviews[0]}></Review>
          )}
          {filteredReviews && filteredReviews.length > 1 && !isLoading && filteredReviews.slice(0,3 * loadCounter).map((review) => {
            return <Review key={review.id} deleteReviewHandler={deleteReviewHandler} editReviewHandler={editReviewHandler} review={review}></Review>;
          })}
          {filteredReviews.length === 0 && !isLoading && (
            <h1>No Reviews Found</h1>
          )}
          <div className="load-button__container">
            {filteredReviews && filteredReviews.slice(0,3*loadCounter).length !== filteredReviews.length && <Button onClick={() => setLoadCounter(loadCounter + 1)}>Load More</Button>}
          </div>
        </div>
      </div>
      <div className="reviews-sidebar" >
                    <div className="reviews-sidebar__header">
                        <h3>Filters</h3>
                    </div>
                    {filteredReviews ?  (<React.Fragment>
                      <div className="search-container">
                        <form onSubmit={searchBySearchTerm}>
                          <input placeholder="Search Reviews" className="search-bar" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                          {searchTerm !== '' && <span className="modal-cross cross"><i onClick={() => setSearchTerm('')} className="fa fa-times" aria-hidden="true"></i></span>}
                        </form>
                    </div>
                    <select name="sort-by" className="sort-by" onChange={sortReviewsHandler} required>
                        <option value="" hidden>Sort By</option>
                        <option onClick={sortByHighestRating}>Highest Rated</option>
                        <option onClick={sortByLowestRating}>Lowest Rated</option>
                        <option>Most Recent</option>
                    </select>
                    <div className="filter-by__rating">
                        <h1>Filter By Rating: </h1>
                        <div className="filter-by__rating-rating" ><div className="stars" onClick={() => filterByRating(1)}>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage" >&nbsp; {(((loadedReviews.filter(review => review.rating === 1).length) / loadedReviews.length) * 100).toFixed(0)}%</span>{filterRating === 1 && <span className="modal-cross cross"><i onClick={cancelFilterHandler} className="fa fa-times" aria-hidden="true"></i></span>}</div>
                        <div className="filter-by__rating-rating" ><div className="stars" onClick={() => filterByRating(2)}>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; {(((loadedReviews.filter(review => review.rating === 2).length) / loadedReviews.length) * 100).toFixed(0)}%</span>{filterRating === 2 && <span className="modal-cross cross"><i onClick={cancelFilterHandler} className="fa fa-times" aria-hidden="true"></i></span>}</div>
                        <div className="filter-by__rating-rating" ><div className="stars" onClick={() => filterByRating(3)}>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; {(((loadedReviews.filter(review => review.rating === 3).length) / loadedReviews.length) * 100).toFixed(0)}%</span>{filterRating === 3 && <span className="modal-cross cross"><i onClick={cancelFilterHandler} className="fa fa-times" aria-hidden="true"></i></span>}</div>
                        <div className="filter-by__rating-rating" ><div className="stars" onClick={() => filterByRating(4)}>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; {(((loadedReviews.filter(review => review.rating === 4).length) / loadedReviews.length) * 100).toFixed(0)}%</span>{filterRating === 4 && <span className="modal-cross cross"><i onClick={cancelFilterHandler} className="fa fa-times" aria-hidden="true"></i></span>}</div>
                        <div className="filter-by__rating-rating" ><div className="stars" onClick={() => filterByRating(5)}>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span> 
                            <span className="fa fa-star checked"></span>
                            </div><span className="filter-by__rating-rating__percentage">&nbsp; {(((loadedReviews.filter(review => review.rating === 5).length) / loadedReviews.length) * 100).toFixed(0)}%</span>{filterRating === 5 && <span className="modal-cross cross"><i onClick={cancelFilterHandler} className="fa fa-times" aria-hidden="true"></i></span>}</div>
                        </div>
                    </React.Fragment>): <LoadingSpinner />}
                    </div>
    </React.Fragment>
  );
};

export default ReviewsContent;
