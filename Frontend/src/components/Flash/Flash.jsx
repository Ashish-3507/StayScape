import { useFlash } from '../../context/FlashContext';

export default function Flash() {
    const { flash, clearFlash } = useFlash();

    if (!flash || !flash.message) return null;

    const alertClass = flash.type === 'error' ? 'alert-danger' : 'alert-success';

    return (
        <div className="container mt-3">
            <div className={`alert ${alertClass} alert-dismissible fade show col-6 offset-3`} role="alert">
                {flash.message}
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={clearFlash}
                ></button>
            </div>
        </div>
    );
}
