var jsonUser ={ 
	"usuarios":[
		{"usuario":"USUARIO","password":"CONTRASEÑA" },
		{"usuario":"pablo","password":"pablo" },
		{"usuario":"javi","password":"javi" },
		{"usuario":"admin","password":"admin" }	,
	]
}

var reserva = ['0','0','0','0'];

window.onload = function(){/*hace que se cargue la función lo que predetermina que div estará oculto hasta llamar a la función nuevamente*/
	muestra_oculta('reserva');/* "contenido_a_mostrar" es el nombre que le dimos al DIV */
	muestra_oculta_admin('admin')
	
}	

function muestra_oculta(id){
	//alert(document.getElementById(id));
	if (document.getElementById){ //se obtiene el id
		var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
		el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
    }
}

function muestra_oculta_admin(clase){
	//alert(document.getElementsByClassName(clase));
	if (document.getElementsByClassName){ //se obtiene la clase
		var el = document.getElementsByClassName(clase); //se define la variable "el" igual a nuestro div
		for (var i=0; i<el.length;i++){
			el[i].style.display = (el[i].style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
		}
    }
}

function login(){
	var i=0;

	while(i < jsonUser.usuarios.length && jsonUser.usuarios[i].usuario!=document.form.usuario.value){
		i+=1;
	}

	if(i < jsonUser.usuarios.length){
		if(document.form.usuario.value==jsonUser.usuarios[i].usuario && document.form.password.value==jsonUser.usuarios[i].password){ 
			muestra_oculta('registro');
			muestra_oculta('reserva');
			if(document.form.usuario.value=="admin"){
				muestra_oculta_admin('admin');
			}
		}else{ 
			 alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
		}
	}else{
		alert("Porfavor ingrese, nombre de usuario y contraseña correctos.");
	}
}

function cerrar_sesion(){
	if(document.form.usuario.value=="admin"){
		muestra_oculta_admin('admin');
	}
	document.form.usuario.value="";
	document.form.password.value="";
    muestra_oculta('registro');
    muestra_oculta('reserva');    
}

function reserva_usuario(idHora){
	var puedeReservar=true;
	pistaReservada=reserva.indexOf(document.form.usuario.value);
	if(pistaReservada==-1){
		if(reserva[idHora.id]=='0'){
			reserva[idHora.id] = document.form.usuario.value;
			document.getElementById(idHora.id).src="imagenes/ocupado.png";
			alert("Pista Reservada!!");
		}else if(reserva[idHora.id]=='1'){
			alert("Lo sentimos, esta en mantenimiento");
		}else{	
			alert("Lo sentimos, pista ya reservada");
		}
	}else{
		alert("Lo sentimos, ya tiene reservada una pista. No puede reservar más hasta mañana");
	}
}

function libera_pista(idHora){
	var cadenaId=new String(idHora.id);
	var hora=cadenaId.charAt(cadenaId.length-1);
	if(reserva[hora]=='0'){
		alert("La pista ya estaba libre");
	}else{
		reserva[hora]='0';
		document.getElementById(hora).src="imagenes/libre.png";
		alert("La pista ha sido liberada");
	}
}	

function mantenimiento_pista(idHora){
	var cadenaId=new String(idHora.id);
	var hora=cadenaId.charAt(cadenaId.length-1);
	if(reserva[hora]=='1'){
		alert("Pista ya en mantenimiento");
	}else{
		reserva[hora]='1';
		document.getElementById(hora).src="imagenes/mantenimiento.png";
		alert("La pista ha sido puesta en mantenimiento");
	}
}