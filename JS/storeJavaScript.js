//Store Page JavaScript

var data = {"cartTotal":0,"rows":[]};
var totalCost = 0;

function clearClick(){
    localStorage.clear();
}

$(function()
{
	//grid
			$('#cartProducts').datagrid({
				singleSelect:true
			});
			
			// check that the browser understands storage and check for a stored item by its name
			if(localStorage &&  localStorage.getItem('shopCart'))
			{
				console.log(localStorage.getItem('shopCart'));
				data = JSON.parse(localStorage.getItem('shopCart'));
				totalCost = parseFloat(localStorage.getItem('cartTotal'));
				// console log localStorage.getItem('cart') value, you will see a long json string
				// parse json from stting into an array object
  			
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
		
		function addProduct(product,price){
			function add(){
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
			add();
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
			console.log(totalCost);
		}