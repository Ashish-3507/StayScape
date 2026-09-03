import { useEffect, useState } from 'react';
import listingService from '../../services/listingService';
import ListingCard from '../../components/ListingCard/ListingCard';
import { useFlash } from '../../context/FlashContext';

export default function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showFlash } = useFlash();

    useEffect(() => {
        listingService.getListings()
            .then(res => {
                if (res.success) {
                    setListings(res.data);
                } else {
                    showFlash('error', res.error || 'Failed to fetch listings');
                }
            })
            .catch(err => {
                console.error(err);
                showFlash('error', 'Error connecting to server');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-success" role="status"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="mb-4 fw-semibold">All Listings</h2>

            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
                {listings.map(listing => (
                    <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>
        </div>
    );
}
