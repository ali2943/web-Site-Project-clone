        // Simple demo tracking functionality
        document.getElementById('trackingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const orderId = document.getElementById('orderId').value;
            const phone = document.getElementById('phone').value;
            
            if (orderId && phone) {
                document.getElementById('trackingInfo').classList.add('show');
                document.getElementById('trackingInfo').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
