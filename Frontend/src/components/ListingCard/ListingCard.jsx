import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
    return (
        <div className="col">
            <Link to={`/listings/${listing._id}`} className="listing-link text-decoration-none text-dark">
                <div className="card listing-card h-100 border-0 shadow-sm">
                    <img
                        src={listing.image?.url}
                        className="card-img-top"
                        alt="listing_image"
                        style={{ height: '20rem', objectFit: 'cover', borderRadius: '1rem' }}
                    />
                    <div className="card-body px-0">
                        <p className="card-text mb-1">
                            <b>{listing.title}</b>
                        </p>
                        <p className="text-muted mb-0">
                            &#8377; {listing.price ? listing.price.toLocaleString("en-IN") : 0} / night
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
