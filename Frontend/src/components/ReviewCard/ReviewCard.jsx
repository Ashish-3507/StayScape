import { useAuth } from '../../context/AuthContext';

export default function ReviewCard({ review, onDelete }) {
    const { currentUser } = useAuth();
    const isAuthor = currentUser && review.author && currentUser._id === review.author._id;

    return (
        <div className="col-md-6 mb-3">
            <div className="card review-card shadow-sm border-0 bg-light h-100">
                <div className="card-body">
                    <h6 className="mb-1 fw-bold">{review.author?.username || "Anonymous"}</h6>
                    <p className="starability-result card-text" data-rating={review.rating}>
                        Rated: {review.rating} stars
                    </p>
                    <p className="card-text mb-2">{review.comment}</p>
                    
                    {isAuthor && (
                        <button onClick={() => onDelete(review._id)} className="btn btn-sm btn-dark">
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
