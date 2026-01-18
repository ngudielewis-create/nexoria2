// Admin Panel JavaScript

// Configuration - Changez ces valeurs pour votre sécurité
const ADMIN_CONFIG = {
    username: 'admin',
    password: 'nexoria2024', // Changez ce mot de passe !
    sessionKey: 'nexoria_admin_session'
};

// Vérifier si l'utilisateur est connecté
function checkAuth() {
    const session = localStorage.getItem(ADMIN_CONFIG.sessionKey);
    if (session === 'authenticated') {
        showDashboard();
        loadOrders();
    } else {
        showLogin();
    }
}

// Afficher l'écran de connexion
function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Afficher le dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
}

// Gestion de la connexion
const loginForm = document.getElementById('adminLoginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        const errorDiv = document.getElementById('loginError');
        
        if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
            // Connexion réussie
            localStorage.setItem(ADMIN_CONFIG.sessionKey, 'authenticated');
            errorDiv.style.display = 'none';
            showDashboard();
            loadOrders();
        } else {
            // Erreur de connexion
            errorDiv.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
            errorDiv.style.display = 'block';
            document.getElementById('adminPassword').value = '';
        }
    });
}

// Déconnexion
function logout() {
    localStorage.removeItem(ADMIN_CONFIG.sessionKey);
    showLogin();
    document.getElementById('adminLoginForm').reset();
    document.getElementById('loginError').style.display = 'none';
}

// Charger les commandes depuis localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
    const tbody = document.getElementById('ordersTableBody');
    
    // Mettre à jour les statistiques
    updateStats(orders);
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">Aucune commande pour le moment</td></tr>';
        return;
    }
    
    // Trier par date (plus récent en premier)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tbody.innerHTML = orders.map((order, index) => {
        const date = new Date(order.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusClass = order.status || 'pending';
        const statusText = {
            'pending': 'En attente',
            'processing': 'En cours',
            'completed': 'Terminée'
        }[statusClass] || 'En attente';
        
        return `
            <tr>
                <td>#${String(index + 1).padStart(4, '0')}</td>
                <td>${order.name}</td>
                <td>${getServiceName(order.service)}</td>
                <td>${date}</td>
                <td><span class="status-badge status-${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-action" onclick="viewOrder(${index})">Voir</button>
                    <button class="btn-action" onclick="deleteOrder(${index})">Supprimer</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Obtenir le nom du service
function getServiceName(service) {
    const services = {
        'site-web': 'Création de Site Web',
        'branding': 'Branding & Identité Visuelle',
        'storytelling': 'Storyline & Storytelling',
        'combo': 'Pack Complet'
    };
    return services[service] || service;
}

// Mettre à jour les statistiques
function updateStats(orders) {
    const total = orders.length;
    const pending = orders.filter(o => !o.status || o.status === 'pending').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    
    // Calculer les revenus (estimation basée sur les offres)
    let revenue = 0;
    orders.forEach(order => {
        if (order.offer === 'starter') revenue += 100;
        else if (order.offer === 'business') revenue += 250;
        else if (order.offer === 'premium') revenue += 2000;
        else revenue += 500; // Par défaut
    });
    
    document.getElementById('totalOrders').textContent = total;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('completedOrders').textContent = completed;
    document.getElementById('totalRevenue').textContent = revenue.toLocaleString('fr-FR') + '€';
}

// Voir les détails d'une commande
function viewOrder(index) {
    const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
    const order = orders[index];
    
    if (!order) return;
    
    const modal = document.getElementById('orderModal');
    const detailsDiv = document.getElementById('orderDetails');
    
    const date = new Date(order.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    detailsDiv.innerHTML = `
        <div class="order-detail-item">
            <label>ID Commande</label>
            <p>#${String(index + 1).padStart(4, '0')}</p>
        </div>
        <div class="order-detail-item">
            <label>Date</label>
            <p>${date}</p>
        </div>
        <div class="order-detail-item">
            <label>Client</label>
            <p>${order.name}</p>
        </div>
        <div class="order-detail-item">
            <label>Email</label>
            <p><a href="mailto:${order.email}">${order.email}</a></p>
        </div>
        <div class="order-detail-item">
            <label>Téléphone</label>
            <p><a href="tel:${order.phone}">${order.phone}</a></p>
        </div>
        ${order.company ? `
        <div class="order-detail-item">
            <label>Entreprise</label>
            <p>${order.company}</p>
        </div>
        ` : ''}
        <div class="order-detail-item">
            <label>Service</label>
            <p>${getServiceName(order.service)}</p>
        </div>
        ${order.offer ? `
        <div class="order-detail-item">
            <label>Offre</label>
            <p>${order.offer.charAt(0).toUpperCase() + order.offer.slice(1)}</p>
        </div>
        ` : ''}
        <div class="order-detail-item">
            <label>Type de livraison</label>
            <p>${order.delivery === 'physical' ? 'Livraison physique' : 'Livraison digitale'}</p>
        </div>
        <div class="order-detail-item">
            <label>Besoins du client</label>
            <p>${order.needs || 'Non spécifié'}</p>
        </div>
        <div class="order-detail-item">
            <label>Statut</label>
            <p>
                <select id="orderStatusSelect" class="status-select">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>En attente</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>En cours</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Terminée</option>
                </select>
            </p>
        </div>
    `;
    
    modal.style.display = 'flex';
    window.currentOrderIndex = index;
}

// Fermer la modal
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Mettre à jour le statut d'une commande
function updateOrderStatus() {
    const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
    const statusSelect = document.getElementById('orderStatusSelect');
    
    if (window.currentOrderIndex !== undefined && statusSelect) {
        orders[window.currentOrderIndex].status = statusSelect.value;
        localStorage.setItem('nexoria_orders', JSON.stringify(orders));
        loadOrders();
        closeModal();
    }
}

// Supprimer une commande
function deleteOrder(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
        const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
        orders.splice(index, 1);
        localStorage.setItem('nexoria_orders', JSON.stringify(orders));
        loadOrders();
    }
}

// Exporter les commandes
function exportOrders() {
    const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
    
    if (orders.length === 0) {
        alert('Aucune commande à exporter');
        return;
    }
    
    // Créer un CSV
    const headers = ['ID', 'Date', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Service', 'Offre', 'Livraison', 'Besoins', 'Statut'];
    const rows = orders.map((order, index) => {
        const date = new Date(order.date).toLocaleDateString('fr-FR');
        return [
            `#${String(index + 1).padStart(4, '0')}`,
            date,
            order.name || '',
            order.email || '',
            order.phone || '',
            order.company || '',
            getServiceName(order.service),
            order.offer || '',
            order.delivery === 'physical' ? 'Physique' : 'Digitale',
            order.needs || '',
            order.status || 'pending'
        ];
    });
    
    const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `nexoria_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fermer la modal en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Sauvegarder les commandes depuis le formulaire principal
    if (typeof window !== 'undefined') {
        const originalSubmit = window.orderFormSubmit;
        // Cette fonction sera appelée depuis script.js quand une commande est soumise
    }
});

// Exposer la fonction pour sauvegarder les commandes depuis le site principal
if (typeof window !== 'undefined') {
    window.saveOrderToAdmin = function(orderData) {
        const orders = JSON.parse(localStorage.getItem('nexoria_orders') || '[]');
        orderData.date = new Date().toISOString();
        orderData.status = 'pending';
        orders.push(orderData);
        localStorage.setItem('nexoria_orders', JSON.stringify(orders));
    };
}
