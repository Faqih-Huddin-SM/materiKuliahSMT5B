// Import Library
import React, {useEffect, useState, useRef} from "react";

// Import Components
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch, 
  Modal, 
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  Animated, //tambahan
  KeyboardAvoidingView, //tambahan
} from 'react-native';

// ctrl+L for Agent

// =====================================
// PROFILE
// =====================================

const PROFILE = {
  name: 'Faqih Huddin SM.',
  title: 'Front-end Developer',
  email: 'faqihhuddinsm@gmail.com',
  phone: '+62 82219690449',
  location: 'Cirebon, Jawa Barat',
  bio: 'Programer Pemula yang masih perlu banyak belajar',
  avatar: require ('./assets/WhatsApp Image 2026-09-21 at 11.55.38.jpeg'),
  // avatarOffline: '',
}

// =====================================
// WARNA
// =====================================
const SKILLS = [
{ id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
{ id: '2', name: 'Flutter', level: 75, color: '#02569B' },
{ id: '3', name: 'JavaScript', level: 88, color: '#F7DF1E' },
{ id: '4', name: 'TypeScript', level: 80, color: '#3178C6' },
{ id: '5', name: 'Node.js', level: 70, color: '#339933' },
{ id: '6', name: 'Firebase', level: 82, color: '#FFCA28' },
{ id: '7', name: 'HTML', level: 85, color: '#ed0505' }, //tambahan
{ id: '8', name: 'CSS', level: 80, color: '#8B5CF6' },  //tambahan
{ id: '9', name: 'Bootstrap', level: 78, color: '#e615d8' }, //tambahan
];

// =====================================
// RIWAYAT
// =====================================
const SECTIONS = [
  {
    title: '💼 Pengalaman',
    data: [
      {
        id: 'e1',
        role: 'Full Stack Developer',
        company: 'Project Pribadi',
        period: '2024 - Sekarang',
        desc: 'Membuat Sebuah Website sederhana.',
      },
      {
        id: 'e2',
        role: 'Junior Developer',
        company: 'Pembelajar Informatika',
        period: '2024 - Sekarang',
        desc: 'Mempelajari pemrograman mobile, web development, database, dan teknologi perangkat lunak.',
      },
    ],  
  },
  {  
      title: '🌐 Organisasi',
      data: [
      {
        id: 'e3',
        role: 'Novo Rangers',
        company: 'Novo Club by Paragon',
        period: '2026 - Sekarang',
        desc: 'Menjadi bagian dari Novo Club by Paragon di Entrepreneur Class',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company:
          'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - Sekarang',
        desc: 'Mempelajari informatika, pemrograman, pengembangan aplikasi, analisis sistem, dan teknologi informasi.',
      },
       {
        id: 'd2',
        role: 'Madrasah Aliyah Jurusan MIPA',
        company:
          'MAN 1 Cirebon',
        period: '2022 - 2024',
        desc: 'Menempuh pendidikan menengah dengan fokus pada Matematika dan Ilmu Pengetahuan Alam.',
      },
    ],
  },
];

// =====================================
// SOCIAL MEDIA
// =====================================

const SOCIAL = [
  {
    id: 's1',
    label: 'GitHub',
    icon: '👨‍🎓',
    url: 'https://github.com/Faqih-Huddin-SM/',
  },
  {
    id: 's2',
    label: 'LinkedIn',
    icon: '💼',
    url: 'www.linkedin.com/in/faqih-huddin-sidik-maulana/',
  },
  {
    id: 's3',
    label: 'Instagram',
    icon: '🌐',
    url: 'https://www.instagram.com/faqihhuddin_25?stkn=MWs1ZzkxNnhsN2NINA==/',
  },
];

//==========================================
// SUB-COMPONENT: SkillCard
// Dipakai oleh FlatList untuk render tiap skill
// Props: item - { name, level, color }
//==========================================

const SkillCard = ({ item }) => (
  // 1. View - container kartu
  <View style={styles.skillCard}>
  {/* Baris atas: nama + persentase */}
  <View style={styles.skillHeader}>
  {/*2. Text - nama skill */}
  <Text style={styles.skillName}>{item.name}</Text>
  <Text style={styles.skillPercent}>{item.level}%</Text>
  </View>

  {/* Progress bar: View berlapis */}
  <View style={styles.progressBg}>
    <View
      style={[
        styles.progressFill,
        // width dinamis dari data, warna dari data
        { width: `${item.level}%`, backgroundColor: item.color
},    ]}
      />
    </View>
  </View>
);

//==========================================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
// Props: item - { role, company, period }, onPress
//==========================================
const TimelineCard = ({ item, onPress }) => (
  // 9. TouchableOpacity - tekan untuk buka Modal
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75} // opacity saat ditekan (0-1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail -</Text>
    </View>
  </TouchableOpacity>
);

//==========================================
// Langkah 4
//==========================================
export default function App() {

  // -- STATE -----------------

  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);

  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('Info');
  const avatarScale = useRef(new Animated.Value(0.8)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
      Animated.spring(avatarScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }, []);

  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage]       = useState('');

  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);

  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);


  // -- HANDLER FUNCTIONS -----------------
  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {
    setSelectedItem(item);// Simpan item yang dipilih
    setModalVisible(true);// Tampilkan modal
  };


  // Dipanggil saat tombol "Kirim Pesan" ditekan
  const handleSend = () => {
    // Validasi input tidak boleh kosong
    if (!senderName.trim() || !message.trim()) {
      Alert.alert( '⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!'
      );
      return;
    }
    setSending(true);// Tampilkan ActivityIndicator

    // Simulasi delay 2 detik (misalnya request ke server)
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅Berhasil', `Pesan dari ${senderName} telah dikirim.`
      );
    }, 2000);
  };

  
// -- langkah 5 -----------------
 return (
  //15. SafeAreaView - area aman dari notch & home bar
    <SafeAreaView style={styles.safeArea}>

    {/*14. statusbar - warna latar status bar & style teks ikon */}
      <StatusBar 
      backgroundColor="#1a1a2e"  // warna latar (android)
      barStyle="light-content" // ikon putih (ios & android)
      />

      {/* HEADER BAR */}
      {/* 1. View - container header dengan flexDirection row */}
      <View style={styles.headerBar}>
        {/* 2. Text - judul header */}
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>

         {/*  Toggle "open work" */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
           {/* switch toggle */}
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork} // nilai saat ini
            trackColor={{ false: '#555', true: '#4ade80' }} // callback saat diubah
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>
         {/* TAMBAHAN ================*/}
         {/* langkah 6 ==================================================*/}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* PROFIL SECTION */}
        <View style={styles.profileSection}>
          {/* foto*/}
          <Animated.Image
            source={PROFILE.avatar}
            style={[
              styles.avatar,
              {
                transform: [{ scale: avatarScale }],
              },
            ]}
          />
          {/* conditional rendering*/}
          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✅ Open to Work</Text>
            </View>
          )}
            {/* text - berbagi ukuran & weight*/}
          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          {/* info kontak dalam baris horizontal*/}
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
          </View>
          <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>

            {/* tab navigasi*/}
          <View style={styles.tabContainer}>
            {['Info', 'Skills', 'Kontak'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.socialBtn}
                onPress={() => Alert.alert('🔗 Link', s.url)}
                activeOpacity={0.8}
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.downloadBtn,
              pressed && styles.downloadBtnPressed,
            ]}
            onPressIn={() => setPressing(true)}
            onPressOut={() => setPressing(false)}
            onPress={() => Alert.alert('⬇️ Download', 'CV sedang diunduh...')}
          >
            <Text style={styles.downloadBtnText}>
              {pressing ? '⏳ Mengunduh...' : '⬇️ Download CV (PDF)'}
            </Text>
          </Pressable>
        </View>

          {/* ============================= */}
          {/* TAB CONTENT */}
          {/* ============================= */}

          {activeTab === 'Info' && (
            <View style={styles.sectionBox}>
              {/* langkah 7============================================ */}
              <Text style={styles.sectionTitle}>📋 Riwayat</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ Pengalaman, Organisasi, dan pendidikan
              </Text>

              <SectionList
                sections={SECTIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TimelineCard
                    item={item}
                    onPress={handleCardPress}
                  />
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>
                      {title}
                    </Text>
                  </View>
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10 }} />
                )}
                SectionSeparatorComponent={() => (
                  <View style={{ height: 16 }} />
                )}
              />
            </View>
          )}

          {activeTab === 'Skills' && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ FlatList: menampilkan daftar keahlian
              </Text>
              {/* flat list - daftar skill */}
              <FlatList
                data={SKILLS}       // array data
                keyExtractor={(item) => item.id}  //key unik tiap item
                renderItem={({ item }) => ( // render tiap item
                  <SkillCard item={item} />
                )}
                scrollEnabled={false}     // komponen di handle ScrollView
                ItemSeparatorComponent={() => ( // komponen pemisah antar item
                  <View style={{ height: 8 }} />
                )}
              />
            </View>
          )}
            {/* langkah 8 ==============================*/}
          {activeTab === 'Kontak' && (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
             {/* langkah 8 ori ==============================*/} 
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>✉️ Hubungi Saya</Text>
                <Text style={styles.sectionSubtitle}>
                  ↳ TextInput, Button, ActivityIndicator, KeyboardAvoidingView
                </Text>
                {/* text input - input nama (single lane)*/}
                <TextInput
                  style={styles.textInput}
                  placeholder="Nama Anda"
                  placeholderTextColor="#888"
                  value={senderName}  // nilai terkontrol dari state
                  onChangeText={setSenderName} // update state setiap ketik
                  returnKeyType="next" // non aktif saat loading
                  editable={!sending}
                />
                {/* TextInput - input pesan (multi lane)*/}
                <TextInput
                  style={[styles.textInput, styles.textArea]} // gabungkan 2 style
                  placeholder="Tulis pesan Anda di sini..."
                  placeholderTextColor="#888"
                  value={message}
                  onChangeText={setMessage}
                  multiline                           // aktikan multi lane
                  numberOfLines={4}                   // tinggi awal 4 baris
                  textAlignVertical="top"             // teks mulai dari ata (android)
                  editable={!sending}
                />

              {/* kondisi: tampilan loading atau tombol saat proses*/}
                {sending ? (
                  // ActivityIndicator
                  <View style={styles.loadingRow}>
                    <ActivityIndicator
                      size="large"
                      color="#7c3aed"
                    />
                    <Text style={styles.loadingText}>
                      Mengirim pesan...
                    </Text>
                  </View>
                ) : (
                  // button - tombol standar react native
                  <Button
                    title="📨 Kirim Pesan"
                    color="#7c3aed"       // warna tombol
                    onPress={handleSend}    // handler saat ditekan
                  />
                )}
              </View>
            </KeyboardAvoidingView>
          )}
</ScrollView>
      {/* langkah 10 ==============================*/}
      {/* MODAL POPUP DILETAKKAN DI LUAR SCROLLVIEW */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
// langkah 11=============================
const COLORS = {
  bg: '#0f0f1a',          //latar belakang
  card: '#1a1a2e',        //kartu/pane
  cardBorder: '#2d2d44',   //border kartu
  accent: '#7c3aed',    //ungu utama
  accentLight: '#a78bfa',   //ungu muda
  accentGold: '#f59e0b',    //emas
  text: '#f0f0f0',          //teks utama
  textMuted: '#9ca3af',   // teks redup
  textDim: '#6b7280',   //teks sangat redup
  success: '#4ade80',   //hijau
  white: '#ffffff',
};
// semua style
const styles = StyleSheet.create({
  // layout dasar======
  safeArea: {
    flex: 1,  // isi layar
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  // header bar
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',   // anak tersusun
    justifyContent: 'space-between',  //ujung kiri & kanan
    alignItems: 'center',   //rata tengah vertikal
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,   //bayangan androi
    shadowColor: '#000',    //bayangan ios
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,     // jarak antar anak
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // SECTION PROFIL ==============================
  profileSection: {
    alignItems: 'center', // rata tengah horizontal
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,   // sudut kiri bawah melengkung
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,   // lingkaran (widh/2)
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,   // tinggi tiap baris teks
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',   // bungkus ke baris baru jika tidak muat
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
  color: COLORS.textMuted,
  fontSize: 12,
  textAlign: 'center',
  marginBottom: 4,
},

// =============================
// STYLE TAB
// =============================

tabContainer: {
  flexDirection: 'row',
  width: '100%',
  marginTop: 15,
  marginBottom: 10,
},

tabButton: {
  flex: 1,
  paddingVertical: 10,
  alignItems: 'center',
  borderBottomWidth: 2,
  borderBottomColor: COLORS.cardBorder,
},

activeTabButton: {
  borderBottomColor: COLORS.accent,
},

tabText: {
  color: COLORS.textMuted,
  fontSize: 14,
  fontWeight: '600',
},

activeTabText: {
  color: COLORS.accentLight,
  fontWeight: '700',
},
// SOSIAL MEDIA =============================
socialRow: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 16,
  marginBottom: 20,
},

  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },
  // PRESSABLE DOWNLOAD ====================
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,       // pill shape
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',     //lebih gelap saat ditekan
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  // SECTION BOX============================================
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  // SECTION LIST HEADER ====================================
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },
  // SKILL CARD==============================
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',   // clip anak yang melampaui batas
  },
  progressFill: {
    height: 6,
    borderRadius: 4,    // widh & backgroundColour diset secara in line (dinamis dari data)
  },
  //  TIMELINE CARD========================
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },
  // TEXT INPUT===================================================
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  //LOADING ROW=================================
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },
  // MODAL=====================================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});