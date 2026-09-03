import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import listingService from '../../services/listingService';
import { useFlash } from '../../context/FlashContext';

export default function EditListing() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showFlash } = useFlash();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: ''
    });
    const [originalImage, setOriginalImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listingService.getListing(id)
            .then(res => {
                if (res.success) {
                    const l = res.data;
                    setFormData({
                        title: l.title || '',
                        description: l.description || '',
                        price: l.price || '',
                        location: l.location || '',
                        country: l.country || ''
                    });
                    setOriginalImage(l.image?.url);
                } else {
                    showFlash('error', res.error || 'Failed to fetch listing details');
                    navigate(`/listings/${id}`);
                }
            })
            .catch(err => {
                console.error(err);
                showFlash('error', err.response?.data?.error || 'Error loading listing');
                navigate(`/listings/${id}`);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            data.append(`listing[${key}]`, formData[key]);
        });

        if (imageFile) {
            data.append('listing[image]', imageFile);
        }

        try {
            const res = await listingService.updateListing(id, data);
            if (res.success) {
                showFlash('success', res.message || 'Listing updated successfully');
                navigate(`/listings/${id}`);
            } else {
                showFlash('error', res.error || 'Failed to update listing');
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Failed to update listing');
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-success" role="status"></div>
            </div>
        );
    }

    return (
        <div className="row mt-3">
            <div className="col-8 offset-2">
                <h3>Edit your listing</h3>
                <br />
                <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        ></textarea>
                    </div>

                    {originalImage && (
                        <div className="mb-3">
                            Original Listing Image: <br />
                            <img
                                src={originalImage}
                                alt="Original listing"
                                style={{ height: '100px', borderRadius: '5px', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload new Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <br />
                    <div className="mb-3">
                        <button className="btn btn-dark edit-btn">EDIT</button>
                    </div>
                    <br />
                </form>
            </div>
        </div>
    );
}
