//Store Page JavaScript

//Variables
var data = {"cartTotal":0,"rows":[]};
var totalCost = 0; // Total cost initialized at 0

$(function()
{
	// Data grid
			$('#cartProducts').datagrid({
				singleSelect:true
			});
			
			// check that the browser understands storage and check for a stored item by its name
			if(localStorage &&  localStorage.getItem('shopCart')) // Local storage is loaded
			{
				console.log(localStorage.getItem('shopCart'));
				data = JSON.parse(localStorage.getItem('shopCart'));
				totalCost = parseFloat(localStorage.getItem('cartTotal')); // JSON is parsed
	
  			
			console.log(data);
			$('#cartProducts').datagrid('loadData', data);
			$('div.shopCart .cartTotal').html('Total: £'+totalCost);
			}
			
			
			
			// Dragable Products
			$('.product').draggable({
				revert:true,
				proxy:'clone',
				onStartDrag:function(){
					$(this).draggable('proxy').css('z-index',10);
				}
				
			});
			
			// Products dropped to cart
			$('.shopCart').droppable({
				onDrop:function(e,source){
					var product = $(source).find('p.productTitle').text();
					var price = $(source).find('p.productTitle').attr("data");
					addProduct(product, parseFloat(price));
				}
			});
		});
		
		// Add product to cart
		function addProduct(product,price){
			function add(){ // When item is added to cart
				for(var i=0; i<data.cartTotal; i++){
					var row = data.rows[i];
					if (row.product == product){
						row.quantity += 1;
						return;
					}
				}
				data.cartTotal += 1;
				data.rows.push
				({
					product:product,
					quantity:1,
					price:price
				});
			}
			add(); // Add function is called
			totalCost += price;
			$('#cartProducts').datagrid('loadData', data);
			$('div.shopCart .cartTotal').html('Total: £'+totalCost);
			
			// Set local storage
			if(localStorage)
			{
				localStorage.setItem('shopCart', JSON.stringify(data));
				localStorage.setItem('cartTotal', totalCost);
			}
			console.log(JSON.stringify(data)); // JS array is stringified and logged
			console.log(totalCost); // Log totalCost to console
		}