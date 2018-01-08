//Store Page JavaScript

var data = {"total":0,"rows":[]};
var totalCost = 0;

$(function()
{
	//grid
			$('#cartProducts').datagrid({
				singleSelect:true
			});
			
			// check that the browser understands storage and check for a stored item by its name
			if(localStorage &&  ?? ){
				// console log localStorage.getItem('cart') value, you will see a long json string
				// parse json from stting into an array object
  			data=//change this 
  			
			console.log(data);
			//$('#cartcontent').datagrid('loadData', data);
			
			///update  .total html() or text()
  			//localStorage.clear();

				}
			
			
			
			// items to drag
			$('.product').draggable({
				revert:true,
				proxy:'clone',
				onStartDrag:function(){
					$(this).draggable('proxy').css('z-index',10);
				}
				
			});
			
			//item to drop
			$('.shopCart').droppable({
				onDrop:function(e,source){
					var name = $(source).find('p.productName').text();
					var price = $(source).find('p.productPrice').attr("data");
					addProduct(name, parseFloat(price));
				}
			});
		});
		
		function addProduct(name,price){
			function add(){
				for(var i=0; i<data.total; i++){
					var row = data.rows[i];
					if (row.name == name){
						row.quantity += 1;
						return;
					}
				}
				data.total += 1;
				data.rows.push({
					name:name,
					quantity:1,
					price:price
				});
			}
			add();
			totalCost += price;
			//load data grid from jquery ui
			$('#cartProducts').datagrid('loadData', data);
			//update totals in the html
			$('div.shopCart .total').html('Total: £'+totalCost);
			
			// add to local storage
			//stringify js array object into json and log it (var ??? = JSON.stringify(obj);)
			console.log(data);
	
		
		//set local storage value to the new json string

		}