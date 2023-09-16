<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import Message from './components/Message.vue'
import FooterView from './components/FooterView.vue'

	const perguntas = ref([
			/*{
			id: "1",
			pergunta: "Qual seu grau de satisfação com o nosso atendimento?",
			opcoes: ["Bom", "Muito Bom", "Ruim"],
			},
			{
			id: "2",
			pergunta: "Como você descreveria a experiencia de comprar conosco?", 
			opcoes: ["Excelente", "Boa", "Descepcionente"],
			},
			{
			id: "3",
			pergunta: "Você voltaria a comprar conosco?", 
			opcoes: ["Sim", "Talvez", "Não"],
			},	*/					
		]
	)

	const input_email = ref('')
	const input_respostas = ref([])
	const input_comentario = ref('')
	const msg = ref('')

const enviar = () => {

		if(!input_respostas.value.length){

			return alert("Nenhuma resposta selecionada!")
		}
		addDoc (collection(db, 'respostas'), {
			email: input_email.value,
			respostas: input_respostas.value,
			comentario: input_comentario.value
		})
  
		msg.value = 'Suas respostas foram enviadas! Obrigado por participar.'
		setTimeout(() => {
			msg.value = (""),
			input_respostas.value = ([])
			input_email.value = (''),
			input_comentario.value = ('')
		},
		5000)
}

onMounted(async() => {
	const querySnapshot = await getDocs(collection(db, 'perguntas'));
	const fireBasePerguntas = []
	querySnapshot.forEach((doc) => {
  	console.log(doc.id, " => ", doc.data());
	const perg = {
		id: doc.data().id,
		pergunta: doc.data().pergunta,
		opcoes: doc.data().opcoes
	}
	fireBasePerguntas.push(perg)
});
	perguntas.value = fireBasePerguntas
	
	
})
</script>

<template>
	<main class="app">
		<section class="create-todo">
			<h2 class="titulo">Bem-Vindo! Queremos saber a sua opnião!</h2>
		</section>
		
		<section class="create-todo">
			
			<form id="novo-formulario" @submit.prevent="enviar">

				<h4>Informe seu e-mail (Opcional)</h4>
				<input 
					type="email"
					name="email"
					id="email"		
					placeholder="seu e-mail aqui..."
					v-model="input_email" />

				<div v-for="pergunta in perguntas"  :key="pergunta.id">				
						<h3> {{ pergunta.pergunta }} </h3>
						<h4>Selecione sua resposta (Obrigatório*)</h4>

					<div class="options">
						<section v-for="(opcao, index) in pergunta.opcoes" :key="index">							
								<label>
									<div>				 
									<input
										type="radio"
										:name="category+pergunta.id"
										id="category"	
										:value="opcao"
										v-model="input_respostas[pergunta.id]"/>
									<span class="bubble"></span>
									
								</div>

									<div>{{ opcao }}</div>
								    
								</label>
							
							
						</section>
					</div>
				
				</div>

				<h3>Deseja enviar um comentário?</h3>
				<h4>Enviar um comentário (Opcional)</h4>
			
				<input 
					type="text" 
					name="comentario" 
					id="comentario" 
					placeholder="escreva algo aqui..."
					v-model="input_comentario" />
				<input type="submit" value="Enviar" />				

			</form>
			
			<message :msgProps="msg" v-show="msg"/>
		
		</section>

		<footer-view/>

	</main>
</template>
