var tabDesDiapos=new Array
var rainbow=new Array('violet','indigo','blue','green','yellow','orange','red');
var step=0
var nombreDeSlide
document.onkeypress = clavier
document.onclick = simpleClick
var numSlide=0
var sens=1
function simpleClick(event){
	var theTarget = event.target
	if(event.target.id=='liSommaire'){
		document.getElementById('diapo'+numSlide).style.display='none';
		numSlide=parseInt(event.target.getAttribute('data-numSlide'))
		document.getElementById('diapo'+numSlide).style.display='block';
		}
}
function clavier (event){
	var codeTouche = ('charCode' in event) ? event.charCode : event.keyCode;
	//afficher le code d'une touche'
	//alert ("Le code du la touche est : " + codeTouche);
	
	//fléche de droite
	if (event.keyCode == 39) {sens=1;}
	
	//fléche de gauche
	if (event.keyCode == 37) {sens=-1;}
	
	//touche s pour sommaire
	if (codeTouche== 115) {
		var id='sommaire'
		displayById(id)
		}
		
	//touche n pour note
	if (codeTouche== 110) {
		var id='note'+numSlide
		displayById(id)
		}
	
	//barre espace pour changer de diapo
	if (codeTouche== 32) {
		document.getElementById('diapo'+numSlide).style.display='none';
		numSlide=numSlide+sens;
		if(numSlide==nombreDeSlide){numSlide=0;}
		if(numSlide==-1){numSlide=nombreDeSlide-1;}
		document.getElementById('diapo'+numSlide).style.display='block';
    }
	
}

//affiche le bloc si caché, cache le bloc si affiché.
function displayById(id){
	if(document.getElementById(id).style.display=='none'){document.getElementById(id).style.display='block';}
	else{document.getElementById(id).style.display='none';}
	}

//function afficheDiapo(){}

function deroule(id1,id2) {
	derouleDiv(id1);
	derouleDiv(id2);
}

function derouleDiv(id_div) {
     if(document.getElementById(id_div).className=='afficheDiv')
       {document.getElementById(id_div).className='cacheDiv'}
      else if(document.getElementById(id_div).className=='cacheDiv')
       {document.getElementById(id_div).className='afficheDiv'}
    }
    
function initDiapo(tab) {
	var i=0
	for(var clef in tab){
		this[clef]=tab[clef]
		//console.log(tab[i]+'='+tabV[i])
		}
}

function listing(code){
	var str=code
	
	/*var strCode=''
	var tabDesLigne=code.split("\n")
	for(var i=0;i<tabDesLigne.length;i++){
		//Gestion des commentaires
		if(tabDesLigne[i].substring(0, 1) == '#'){strCode+='<div class="listingRouge">'+tabDesLigne[i]+'</div>'}
		
		
		}*/
	
	//Gestion des chaines de caractères
	var tab=str.split("\"")
	for(var i=1;i<tab.length;i=i+2){
			tab[i]='<div class="listingOrange">"'+tab[i]+'"</div>'
			}
	str=tab.join("")
		
	var tab=str.split("\'");
	for(var i=1;i<tab.length;i=i+2){
		tab[i]='<div class="listingOrange">"'+tab[i]+'"</div>'
		}
	str=tab.join("")
	
	/*var re = new RegExp("[0-9]","gi");
	var re = /[0-9]/gi
	while ((monTableau = re.exec(str)) !== null) {
		var nombre='<div class="listingVert">'+str.substring(re.lastIndex-1,re.lastIndex)+'</div>'
		str=str.substring(0,re.lastIndex)+nombre+str.substring(re.lastIndex+1,str.length)
		}*/
	for(var i= 0;i<10;i++){
		var re = new RegExp(i,"gi");
		str=str.replace(re,'<div class="listingVert">'+i+'</div>')
		}
	
	//changement de ligne
	re = /\n/gi;
	str=str.replace(re,'<br>')
	//re = /:/gi;
	//str=str.replace(re,':<br>')
	
	//commentaire
	str = str.replace(/#([^;]+);/, '<div class="listingRouge">#$1;</div>');
	
	//mot bleu
	var tab=['do','def','else','elif','from','for','import','in','if','new','print','return','var','while'];
	for(var i=0;i<tab.length;i++){
		re = new RegExp("\\b"+tab[i]+"\\b","gi");
		str=str.replace(re,'<div class="listingBleu">'+tab[i]+'</div>')
		}
	
	//mot marron
	tab=['open','range','RegExp']
	for(var i=0;i<tab.length;i++){
		re = new RegExp("\\b"+tab[i]+"\\b","gi");
		str=str.replace(re,'<div class="listingMaron">'+tab[i]+'</div>')
		}
	
	//écriture en gris
	str='<div class="listing">'+str+'</div>'
	return str
	}
function onClickSommaire(i){
	console.log('onClickSommaire')
	displayById('diapo'+i)
}
//construction du sommaire
function constructionSommaire(){
	var classe='Sommaire'
	var id='sommaire'
	var contenu='<ul>'
	var divSommaire=document.createElement('div')
	var ul=document.createElement('ul')
	divSommaire.setAttribute('class',classe)
	divSommaire.setAttribute('id',id)
	divSommaire.style.display="none"
	for(var i=0;i< nombreDeSlide;i++){
		if((tabDesDiapos[i].chapitre!=undefined)&&(tabDesDiapos[i].chapitre!=tabDesDiapos[i-1].chapitre)){
			var li=document.createElement('li')
			//var a=document.createElement('a')
			var texte =document.createTextNode(tabDesDiapos[i].chapitre)
			li.setAttribute('id','liSommaire')
			li.setAttribute('data-numSlide',i)
			li.style.color="white"
			li.appendChild(texte)
			//li.appendChild(a)
			ul.appendChild(li)
			}
	}
	divSommaire.appendChild(ul)
	document.body.appendChild(divSommaire)
}

//construit une brique de base d'une diapo'
function constructionDiv(classe,id,contenu,diapo){
	var div=document.createElement('div')
	div.setAttribute('class',classe)
	div.setAttribute('id',id)
	div.innerHTML =contenu
	if(classe=='note'){div.style.display="none"}
	diapo.appendChild(div)
}

function constructionDiapo(numDiapo,diapo){
	var tabDivDiapo=new Array('titre','chapitre','corps','pieds','note');
	for (var i in tabDivDiapo) {
		var clef=tabDivDiapo[i]
		if (tabDesDiapos[numDiapo][clef]!=undefined) {
			var classe=clef
			var id=clef+numDiapo
			var contenu=tabDesDiapos[numDiapo][clef]
			constructionDiv(classe,id,contenu,diapo)
		}
	}	
}

function constructionPresentation(){
	
	nombreDeSlide=tabDesDiapos.length
	constructionSommaire()
	
	for(var i=0;i< nombreDeSlide;i++){
		var diapo=document.createElement('div')
		diapo.setAttribute('class',tabDesDiapos[i].classe)
		diapo.setAttribute('id','diapo'+i)
		constructionDiapo(i,diapo)
		document.body.appendChild(diapo) 
		}
	}

function arcEnCiel(chaine){
	var tabchaine=chaine.split('')
	var arc=document.createElement('div')
	arc.setAttribute('class','diapo')

	arc.id=''
	var text
	for(var i=0;i<tabchaine.length;i++){
		var lettre=document.createElement('div')
		lettre.setAttribute('class','lettre')
		
		if(tabchaine[i]!=' '){text=document.createTextNode(tabchaine[i])}
		else{text=document.createTextNode(' ')}
		
		lettre.id='lettre'+(i)
		lettre.appendChild(text)
		arc.appendChild(lettre)
	}
	document.body.appendChild(arc)
	var irise=setInterval (function(){colorise(tabchaine.length)},500)
	
}
 
 
function colorise(){
	temp=step
 
	for (i=0;i<11; i++){
		couleur=(11+temp-i) % 7
		document.getElementById('l'+i).style.color=rainbow[couleur]
		}
	step++
	}
