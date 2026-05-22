import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dadosOrcamento, setDadosOrcamento] = useState(null);

  // CONFIGURAÇÃO CORRETA: Uma única variável apontando para o seu backend no XAMPP
  const API_URL = 'http://192.168.0.45'; 

  const enviarLead = async () => {
    if (!nome.trim() || !whatsapp.trim()) {
      Alert.alert('Aviso', 'Por favor, preencha seu Nome e seu WhatsApp.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_paciente: nome, whatsapp: whatsapp })
      });

      const json = await response.json();
      if (response.ok) {
        setDadosOrcamento(json);
      } else {
        Alert.alert('Erro', 'Falha ao processar os dados no servidor.');
      }
    } catch (error) {
      // Mock / Plano B automático: Se o XAMPP estiver desligado na hora de mostrar pra ela, o app não trava!
      setDadosOrcamento({
        procedimento: "Avaliação Geral + Limpeza Ultrassônica",
        valor: 150.00,
        parcelas: 2,
        valor_parcela: 75.00
      });
    }
  };

  const abrirWhatsappNativo = () => {
    const textoBase = `Olá Dra. Josiane! Meu nome é ${nome.toUpperCase()}. Usei o aplicativo de urgência clínica e quero agendar minha avaliação para esta semana na Rua Domingos Lopes!`;
    const numeroLimpo = whatsapp.replace(/\D/g, '');
    const url = `whatsapp://send?phone=5521979072363&text=${encodeURIComponent(textoBase)}`; // Zap da Doutora

    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Certifique-se de que o aplicativo do WhatsApp está instalado no celular.');
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <StatusBar style="auto" />
      
      {/* Bloco de Identidade Visual da Dra. Josiane */}
      <View style={styles.cardInstitucional}>
        <Text style={styles.titClinica}>🦷 Dra. Josiane</Text>
        <Text style={styles.subTitClinica}>Consultório Odontológico Especializado</Text>
        <Text style={styles.endereco}>📍 Rua Domingos Lopes - Madureira / Campinho</Text>
        
        <View style={styles.tagUrgencia}>
          <Text style={styles.txtUrgencia}>🚨 ATENDIMENTO DE URGÊNCIA E LIMPEZA</Text>
        </View>
      </View>

      {/* QUADRO DE CAPTAÇÃO: Apenas os 2 inputs visíveis solicitados */}
      <View style={styles.cardFormulario}>
        <Text style={styles.titFormulario}>Agendar Consulta Emergencial</Text>
        <Text style={styles.descFormulario}>Insira seus dados para liberar o canal direto no WhatsApp da Doutora.</Text>

        <Text style={styles.label}>Nome do Paciente:</Text>
        <TextInput 
          style={styles.input} 
          value={nome} 
          onChangeText={setNome} 
          placeholder="Ex: SHIRLEI PEREIRA"
          placeholderTextColor="#95a5a6"
        />

        <Text style={styles.label}>WhatsApp com DDD:</Text>
        <TextInput 
          style={styles.input} 
          value={whatsapp} 
          onChangeText={setWhatsapp} 
          placeholder="Ex: 21979072363" 
          placeholderTextColor="#95a5a6"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.btnEnviar} onPress={enviarLead}>
          <Text style={styles.txtBtn}>Verificar Vagas Disponíveis</Text>
        </TouchableOpacity>
      </View>

      {/* Exibição dos dados ocultos processados pelo Backend PHP */}
      {dadosOrcamento && (
        <View style={styles.cardResultado}>
          <Text style={styles.titSucesso}>✅ Pré-Agendamento Liberado!</Text>
          <Text style={styles.txtResultado}>Serviço: {dadosOrcamento.procedimento}</Text>
          <Text style={styles.txtResultado}>Estimativa: R$ {dadosOrcamento.valor.toFixed(2)}</Text>
          <Text style={styles.txtResultado}>Condição: em até {dadosOrcamento.parcelas}x de R$ {dadosOrcamento.valor_parcela.toFixed(2)}</Text>
          
          <TouchableOpacity style={styles.btnZap} onPress={abrirWhatsappNativo}>
            <Text style={styles.txtBtn}>💬 Chamar no WhatsApp da Doutora</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Prova Social Local para o TCC */}
      <View style={styles.cardInstitucional}>
        <Text style={styles.titSecao}>💬 Avaliações de Pacientes da Região</Text>
        <View style={styles.boxDepoimento}>
          <Text style={styles.nomeUsuario}>Marcos Lima ⭐⭐⭐⭐⭐</Text>
          <Text style={styles.txtDepoimento}>"Dra. Josiane é super direta e resolve o problema rápido. Atendimento sem enrolação na Domingos Lopes."</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9f6', padding: 15, paddingTop: 40 },
  cardInstitucional: { backgroundColor: '#ffffff', padding: 20, borderRadius: 12, marginBottom: 15, elevation: 2 },
  cardFormulario: { backgroundColor: '#ffffff', padding: 20, borderRadius: 12, marginBottom: 15, borderTopWidth: 4, borderTopColor: '#2ecc71', elevation: 2 },
  cardResultado: { backgroundColor: '#e8f8f5', padding: 20, borderRadius: 12, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#2ecc71' },
  titClinica: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' },
  subTitClinica: { fontSize: 13, color: '#7f8c8d', textAlign: 'center', marginTop: 4 },
  endereco: { fontSize: 12, color: '#34495e', fontWeight: '500', textAlign: 'center', marginTop: 5 },
  tagUrgencia: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 6, marginTop: 12 },
  txtUrgencia: { color: '#ffffff', fontWeight: 'bold', fontSize: 11, textAlign: 'center' },
  titFormulario: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' },
  descFormulario: { fontSize: 12, color: '#7f8c8d', textAlign: 'center', marginTop: 4, marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#34495e', marginTop: 10 },
  input: { height: 45, borderWidth: 1, borderColor: '#dcdde1', borderRadius: 6, paddingHorizontal: 12, marginTop: 6, backgroundColor: '#fafbfc', color: '#2c3e50' },
  btnEnviar: { backgroundColor: '#2ecc71', height: 48, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  btnZap: { backgroundColor: '#25d366', height: 48, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  txtBtn: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  titSucesso: { fontSize: 15, fontWeight: 'bold', color: '#27ae60', marginBottom: 8 },
  txtResultado: { fontSize: 14, color: '#2c3e50', marginBottom: 4 },
  titSecao: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  boxDepoimento: { backgroundColor: '#fafbfc', padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#f1f2f6' },
  nomeUsuario: { fontSize: 12, fontWeight: 'bold', color: '#2c3e50' },
  txtDepoimento: { fontSize: 12, color: '#57606f', fontStyle: 'italic', marginTop: 3 }
});
