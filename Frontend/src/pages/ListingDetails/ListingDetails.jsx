import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import listingService from '../../services/listingService';
import reviewService from '../../services/reviewService';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { showFlash } = useFlash();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const fetchListing = async () => {
        try {
            const data = await listingService.getListing(id);
            if (data.success) {
                setListing(data.data);
            } else {
                showFlash('error', data.error || 'Failed to fetch listing');
                navigate('/listings');
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Error loading listing');
            navigate('/listings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListing();
    }, [id]);

    const handleDeleteListing = async () => {
        try {
            const data = await listingService.deleteListing(id);
            if (data.success) {
                showFlash('success', data.message || 'Listing deleted successfully');
                navigate('/listings');
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Failed to delete listing');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await reviewService.createReview(id, rating, comment);
            if (data.success) {
                showFlash('success', data.message || 'Review submitted!');
                setComment('');
                setRating(1);
                fetchListing();
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Failed to submit review');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const data = await reviewService.deleteReview(id, reviewId);
            if (data.success) {
                showFlash('success', data.message || 'Review deleted!');
                fetchListing();
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Failed to delete review');
        }
    };

    if (loading || !listing) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-success" role="status"></div>
            </div>
        );
    }

    const isOwner = currentUser && listing.owner && currentUser._id === listing.owner._id;

    return (
        <div className="row mt-4">
            <div className="col-lg-6 offset-lg-3">
                <h4 className="fw-semibold mb-3">{listing.title}</h4>

                <div className="card show-card listing-card">
                    <img
                        src={listing.image?.url}
                        className="card-img-top show-img"
                        alt="listing_img"
                    />

                    <div className="card-body">
                        <i>Owned By: {listing.owner?.username}</i>
                        <p className="card-text mb-2">{listing.description}</p>
                        <p className="mb-1">
                            <span className="price-tag">&#8377; <b>{listing.price?.toLocaleString("en-IN")}</b> / night</span>
                        </p>
                        <p className="mb-0 text-muted">{listing.location}, {listing.country}</p>
                    </div>
                </div>

                {isOwner && (
                    <div className="mt-3 d-flex gap-2">
                        <Link to={`/listings/${listing._id}/edit`} className="btn edit-btn">
                            Edit
                        </Link>
                        <button onClick={handleDeleteListing} className="btn btn-dark">
                            Delete
                        </button>
                    </div>
                )}

                {currentUser && (
                    <>
                        <hr className="mt-4" />
                        <h5 className="fw-semibold">Leave a Review</h5>

                        <form onSubmit={handleReviewSubmit} className="needs-validation">
                            <div className="mt-3">
                                <label htmlFor="rating" className="form-label">Rating</label>
                                <fieldset className="starability-coinFlip">
                                    <input type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" checked={rating === 0} onChange={() => setRating(0)} aria-label="No rating." />
                                    <input type="radio" id="first-rate1" name="rating" value="1" checked={rating === 1} onChange={() => setRating(1)} />
                                    <label htmlFor="first-rate1" title="Terrible">1 star</label>
                                    <input type="radio" id="first-rate2" name="rating" value="2" checked={rating === 2} onChange={() => setRating(2)} />
                                    <label htmlFor="first-rate2" title="Not good">2 stars</label>
                                    <input type="radio" id="first-rate3" name="rating" value="3" checked={rating === 3} onChange={() => setRating(3)} />
                                    <label htmlFor="first-rate3" title="Average">3 stars</label>
                                    <input type="radio" id="first-rate4" name="rating" value="4" checked={rating === 4} onChange={() => setRating(4)} />
                                    <label htmlFor="first-rate4" title="Very good">4 stars</label>
                                    <input type="radio" id="first-rate5" name="rating" value="5" checked={rating === 5} onChange={() => setRating(5)} />
                                    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                                </fieldset>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="comment" className="form-label">Comments</label>
                                <textarea
                                    name="comment"
                                    id="comment"
                                    rows="4"
                                    className="form-control"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <button className="btn add-btn mt-3">Submit Review</button>
                        </form>
                    </>
                )}

                <hr className="mt-4" />
                <h5 className="fw-semibold">All Reviews</h5>

                <div className="row">
                    {listing.reviews && listing.reviews.length > 0 ? (
                        listing.reviews.map(review => (
                            <ReviewCard key={review._id} review={review} onDelete={handleDeleteReview} />
                        ))
                    ) : (
                        <p className="text-muted">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
