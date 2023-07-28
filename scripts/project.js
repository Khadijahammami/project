

//constants 
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";



//MAX_QTY: C'est une constante qui représente la quantité maximale autorisée pour une commande.
//productIdKey: C'est une constante qui représente la clé utilisée pour identifier un produit dans l'élément HTML.
//orderIdKey: C'est une constante qui représente la clé utilisée pour identifier une commande dans l'élément HTML.
//inputIdKey: C'est une constante qui représente la clé utilisée pour identifier une entrée de quantité dans l'élément HTML.


// Total  total: C'est une variable qui représente le montant total de la commande.
// Elle est initialisée à 0 et sera mise à jour chaque fois qu'un produit est ajouté au panier.
var total = 0;
// Cart  cart: C'est un tableau qui représente le panier contenant les produits commandés. 
//Chaque élément du tableau est un objet avec les propriétés product (le produit commandé) et quantity (la quantité de ce produit dans le panier).
var cart = [];





// Fonction à exécuter lorsque la page est chargée
var init = function () {
    createShop();
    updateOrderTotal();
	document.getElementById('filter').addEventListener('input', filterProducts);
}
window.addEventListener("load", init);

// Elle appelle deux autres fonctions : createShop pour créer et afficher les produits dans la boutique, 
// et updateOrderTotal pour mettre à jour le montant total de la commande affiché dans la page.

// Elle ajoute également un événement à l'élément avec l'id "filter" pour écouter les changements d'entrée de recherche de l'utilisateur. 
// Lorsque l'utilisateur saisit un texte dans cet élément,
// la fonction filterProducts sera appelée pour filtrer les produits affichés dans la boutique.


// createShop est une fonction qui crée et affiche les produits disponibles dans la boutique en utilisant les données du tableau catalog
var createShop = function () {
	// j'obtiens l'élément "boutique" où je vais placer tous les produits.
    var shop = document.getElementById("boutique");
	// l'ajout tous les produits à la div 'boutique' en utilisant appendChild et la fonction  création , createProducts.
    for (var i = 0; i < catalog.length; i++) {
        shop.appendChild(createProduct(catalog[i], i));
    }
}

// Créez la balise div pour l'élément produit.
// L'élément créé reçoit l'identifiant index-product, qui est composé du numéro i du produit, du tiret '-', et de la constante productIdKey qui est 'product'.

var createProduct = function (product, index) {
    var block = document.createElement("div");
    block.className = "produit";
	// L'identifiant sera de la forme '0-product', '1-product', etc.
    block.id = index + "-" + productIdKey;
    block.appendChild(createBlock("h4", product.name));
	// Créez un bloc FigureBlock pour ajouter des images.
    block.appendChild(createFigureBlock(product));
    block.appendChild(createBlock("div", product.description, "description"));
    block.appendChild(createBlock("div", product.price, "prix"));
	// Bloc de contrôle de commande, utilisé pour le bouton "Commander" où vous pouvez saisir le numéro du produit 1, 2, 3, etc.
    block.appendChild(createOrderControlBlock(index));
    return block;
}
//   création  d'un bloc pour ajouter chaque élément avec son propre style CSS s'il existe, en utilisant les balises d'entrée (tag) et le contenu.
var createBlock = function (tag, content, cssClass) {
    var element = document.createElement(tag);
    if (cssClass != undefined) {
        element.className = cssClass;
    }
    element.innerHTML = content;
    return element;
}
// Bloc de commande , utilisé pour le bouton "Commander" où vous pouvez saisir le numéro du produit 1, 2, 3, etc.
var createOrderControlBlock = function (index) {
    var control = document.createElement("div");
    control.className = "controle";

    var input = document.createElement("input");
	// L'élément d'entrée (input) reçoit l'identifiant '0-qte' où '0' est le numéro du produit et 'qte' est la constante inputIdkey utilisée pour l'identifiant de l'entrée de quantité de chaque produit. 
    input.id = index + '-' + inputIdKey;
    input.type = "number";
    input.step = "1";
	// la valeur par défaut de la quantité est toujours 0, et elle est réinitialisée à 0 après la commande dans une autre fonction appelée "nextt".
    input.value = "0";
    input.min = "0";
	// MAX_QTY est une constante définie à '9', cela représente la quantité maximale autorisée dans l'entrée de quantité, qui est de 9.
    input.max = MAX_QTY.toString();
    control.appendChild(input);
   // Section du bouton "Commander".
    var button = document.createElement("button");
    button.className = 'commander';
    button.id = index + "-" + orderIdKey;
	// L'opacité par défaut du bouton "Commander" est de 0.25, ce qui signifie que la quantité est égale à 0, utilisant la propriété .style.opacity.
    button.style.opacity = "0.25"; 
	// Lorsqu'on clique sur le bouton, l'événement est transmis à la fonction addToOrder en utilisant le numéro d'index et la valeur de la quantité saisie dans l'entrée (input.value).
    button.addEventListener('click', function() {
        addToOrder(index, input.value);
    });
    control.appendChild(button);

    // création  d'un événement qui se déclenche lorsque la valeur de l'entrée change. Si l'entrée est égale à 0, cela signifie que vous n'avez sélectionné aucune quantité pour le produit, ce qui implique que l'opacité du bouton doit être de 0.25 par défaut.
    input.addEventListener('input', function() {
        if (input.value == "0") {
            button.style.opacity = "0.25";
        } else {
            button.style.opacity = "1";
        }
    });
// Retournez cette div.
    return control;
}

// La fonction addToOrder utilise le numéro et la quantité saisis comme paramètres.
var addToOrder = function(index, quantity) {
	// l'ajout de  cette condition car lorsque la quantité est égale à 0, cela signifie que le client n'a pas choisi ce produit, ce qui implique qu'il n'y a aucune commande à ajouter au panier.
	if (quantity == 0){

	}
	else{
		// la  création  d'événement pour rechercher si le produit existe déjà. S'il existe, il doit être ajouté au même élément. Sinon, une nouvelle div doit être créée.
		var existingItem = cart.find(function(item) {
			return item.product === catalog[index];
		});
	
		if (existingItem) {
			// Si le produit existe déjà dans le panier, ajoutez simplement la quantité.
			existingItem.quantity += parseInt(quantity);
		} else {
			
// Si le produit existe déjà dans le panier, il doit être ajouté au panier.
			cart.push({ product: catalog[index], quantity: parseInt(quantity) });
		}
	
		total += catalog[index].price * quantity;
		// Pour mettre à jour le total, utilisez la fonction updateOrderTotal.
		updateOrderTotal();
		displayCart(); 
        // Rafraîchir l'affichage du panier.
		// Revenir à 0 pour l'entrée et une opacité de 0.25.
		var input = document.getElementById(index + '-' + inputIdKey);
		input.value = "0";
		var button = document.getElementById(index + "-" + orderIdKey);
		button.style.opacity = "0.25";
		
}
}

// Mettre à jour le total.
var updateOrderTotal = function() {
    var totalElement = document.getElementById("montant");
    totalElement.innerHTML = total;
	
}
// Cette fonction permet d'ajouter les images à la div 'boutique'. 
var createFigureBlock = function (product) {
    var figureBlock = document.createElement("figure");
    var img = document.createElement("img");
	// Récupérer l'URL de l'image (src) et son texte alternatif (alt) à partir du fichier catalog1.js.
    img.src = product.image;
    img.alt = product.name;
    figureBlock.appendChild(img);
    
    return figureBlock;
}
// Fonction pour l'affichage du panier.
var displayCart = function() {
//utilisez querySelector pour ajouter une sélection.
    var cartDiv = document.querySelector(".achats");
    cartDiv.innerHTML = ""; 
    cart.forEach(function(item, index) {
       
        var itemDiv = document.createElement("div");
        itemDiv.className = "achat";
		// L'identifiant est toujours composé du numéro du produit suivi de '-achat', où le numéro représente 0, 1, 2, 3, ... le numéro du produit.
        itemDiv.id = index + "-achat";
        
       // Créez une div pour chaque élément (produit).
        var figure = document.createElement("figure");
        var img = document.createElement("img");
        img.src = item.product.image;
        img.alt = item.product.name;
        figure.appendChild(img);
        itemDiv.appendChild(figure);

        // Ajoutez le nom de l'article.
        var h4 = document.createElement("h4");
        h4.innerHTML = item.product.name;
        itemDiv.appendChild(h4);

       // Ajoutez la quantité 
        var quantityDiv = document.createElement("div");
        quantityDiv.className = "quantite";
        quantityDiv.innerHTML = item.quantity;
        itemDiv.appendChild(quantityDiv);

     // Ajoutez le prix  pour un seul article.
        var priceDiv = document.createElement("div");
        priceDiv.className = "prix";
        priceDiv.innerHTML = item.product.price;
        itemDiv.appendChild(priceDiv);

      // Créez un bouton de suppression.
        var controlDiv = document.createElement("div");
    controlDiv.className = "controle";
    var button = document.createElement("button");
    button.className = "retirer";
	// L'identifiant est toujours composé du numéro du produit suivi de '-remove', où le numéro représente le numéro du produit.
    button.id = index + "-remove";
    button.addEventListener('click', function() {
		// Fonction pour supprimer le produit lorsque vous cliquez sur le bouton de suppression du produit sélectionné.
        removeFromCart(index);
    });
    controlDiv.appendChild(button);
    itemDiv.appendChild(controlDiv);
    cartDiv.appendChild(itemDiv);
    });
}

// Fonction pour supprimer un produit de la liste du panier.
var removeFromCart = function(index) {
    var item = cart[index];
    total -= item.product.price * item.quantity;
    cart.splice(index, 1); 
	// Nous devons mettre à jour l'affichage du panier et le total.
    updateOrderTotal();
    displayCart(); 
}
// Fonction pour la recherche.
var filterProducts = function() {
    var filterInput = document.getElementById('filter');
// Il faut convertir en minuscules l'entrée et le nom du produit pour être cohérent
    var filterValue = filterInput.value.toLowerCase();
    var shop = document.getElementById("boutique");
	// Il faut vider tout le magasin.
    shop.innerHTML = ""; 
    for (var i = 0; i < catalog.length; i++) {
        var productName = catalog[i].name.toLowerCase();
		// Utilisez .includes pour rechercher par 1 caractère.
        if (productName.includes(filterValue)) {
            shop.appendChild(createProduct(catalog[i], i));
        }
    }
}
