import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>CURRICULUM VITAE</Text>

      <Text style={styles.label}>Nama Lengkap</Text>
      <Text style={styles.text}>Faqih Huddin SM.</Text>

      <Text style={styles.label}>NIM</Text>
      <Text style={styles.text}>2488010061</Text>

      <Text style={styles.label}>Asal Sekolah</Text>
      <Text style={styles.text}>MAN 1 Cirebon</Text>

      <Text style={styles.label}>Cita-cita</Text>
      <Text style={styles.text}>menjadi pengusaha muda</Text>

      <Text style={styles.label}>Rencana Menggapai Cita-cita</Text>
      <Text style={styles.text}>
        Menjadi seorang pengusaha muda yang sukses dan mandiri adalah target utama hidup saya melalui pembangunan bisnis berbasis teknologi dari nol. Demi mewujudkan impian ini, saya berkomitmen untuk mengasah mental inovatif, mendalami strategi manajemen finansial, serta aktif berjejaring dengan komunitas bisnis sejak dini. Lewat kombinasi eksekusi ide yang berani, adaptasi cepat terhadap tren pasar, dan kegigihan melewati kegagalan, saya siap menciptakan lapangan kerja baru dan memimpin perusahaan saya sendiri
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  }, 

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },

  text: {
    fontSize: 16,
    marginTop: 5,
  },
});