module.exports = {
	getRandomItem : function(arr){
		var index = Math.floor(Math.random() * arr.length);//0-(length-1)
		return arr[index];
	}	
}