import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import listingService from '../../services/listingService';
import { useFlash } from '../../context/FlashContext';

export default function NewListing() {
    const navigate = useNavigate();
    const { showFlash } = useFlash();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: ''
    });
    const [imageFile, setImageFile] = useState(null);

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
            const res = await listingService.createListing(data);
            if (res.success) {
                showFlash('success', res.message || 'New listing created successfully');
                navigate('/listings');
            } else {
                showFlash('error', res.error || 'Failed to create listing');
            }
        } catch (err) {
            console.error(err);
            showFlash('error', err.response?.data?.error || 'Failed to create listing');
        }
    };

    return (
        <div className="row mt-4">
            <div className="col-lg-6 offset-lg-3">
                <div className="card form-card p-4 border-0 shadow-sm">
                    <h4 className="mb-3 fw-semibold">Create New Listing</h4>

                    <form onSubmit={handleSubmit} className="needs-validation">
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter the title"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Upload your image</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price</label>
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
                            <label className="form-label">Location</label>
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
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <button className="btn add-btn w-100 mt-2">
                            Add Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
