var previousNext = '';
var trueNext = '';

$(function(){
	console.log("Button works");
	$.ajax({
		type:"GET",
		url:"https://www.reddit.com/r/all/hot.json",
		success: function(response){
			var children= response.data.children
			//console.log(JSON.stringify(children, null, 2));
			var images = children.filter(function(element) {
				if(element.data.domain === 'i.redd.it' || element.data.domain === 'i.imgur.com') {					
					if(element.data.preview && element.data.preview.images) {
						return true;	
					} 
					else {
						return false;
					}										
				}
				else {
					return false;
				}
			});
			images.forEach(function(image) {
				console.log(JSON.stringify(image.data.preview.images[0].source.url, null, 2));
				console.log('=================================');
				var imgsrc = image.data.preview.images[0].source.url
				$('.img').append('<a href='+ imgsrc +' target="_blank"><img src=' + imgsrc + '></img></a>'); 
			});
		}
	})
})
$('.btn2').click(function(){
	console.log('button works');
	$.ajax({
		type:"GET",
		url:"https://www.reddit.com/r/all/hot.json"+ (previousNext ? ("?after=" + previousNext) : ''),
		success: function(response){
			previousNext = response.data.after;
			console.log('previousNext: ' + previousNext);
			var getTrueNext = function (){
				$.ajax({
					type:"GET",
					url:"https://www.reddit.com/r/all/hot.json"+ (previousNext ? ("?after=" + previousNext) : ''),
					success: function(response){
						trueNext = response.data.after;
						console.log('TrueNext: '+ trueNext);
						previousNext = trueNext;
					}
				})
			}
			getTrueNext();
			console.log("https://www.reddit.com/r/all/hot.json"+ (previousNext ? ("?after=" + previousNext) : ''))
			console.log('======================================')
			//console.log(JSON.stringify(response, null, 2));
			$.ajax({
				type:"GET",
				url:"https://www.reddit.com/r/all/hot.json"+ (previousNext ? ("?after=" + previousNext) : ''),
				success: function(response){
					var children= response.data.children
					//console.log(JSON.stringify(children, null, 2));
					var images = children.filter(function(element) {
						if(element.data.domain === 'i.redd.it' || element.data.domain === 'i.imgur.com') {					
							if(element.data.preview && element.data.preview.images) {
								return true;	
							} 
							else {
								return false;
							}										
						}
						else {
							return false;
						}
					});
					images.forEach(function(image) {
						console.log(JSON.stringify(image.data.preview.images[0].source.url, null, 2));
						console.log('=================================');
						var imgsrc = image.data.preview.images[0].source.url
						$('.img').append('<a href='+ imgsrc +' target="_blank"><img src=' + imgsrc + '></img></a>'); 
					});
				}
			});
		}
	});		
});