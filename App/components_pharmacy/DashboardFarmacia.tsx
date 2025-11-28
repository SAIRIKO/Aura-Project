import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

type UserRole = "admin" | "pharmacy";
type Screen = "approvals" | "pharmacies" | "stock" | "orders" | "profile";

interface DashboardProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

// Mock Data
const salesData = [
  { month: "Jan", value: 45000 },
  { month: "Fev", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Abr", value: 61000 },
  { month: "Mai", value: 55000 },
  { month: "Jun", value: 67000 },
];

const topProducts = [
  { name: "Dipirona", sales: 1250 },
  { name: "Paracetamol", sales: 980 },
  { name: "Ibuprofeno", sales: 850 },
  { name: "Amoxicilina", sales: 720 },
  { name: "Losartana", sales: 650 },
];

export default function Dashboard({ userRole, onNavigate, onLogout }: DashboardProps) {
  const pendingApprovals = 2; // Mock count
  const months = salesData.map(item => item.month);
  const values = salesData.map(item => item.value);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 0, height: 'auto' }} >
        {/* Header */}
        <View style={styles.header}>
            <View>
                <Text style={styles.welcomeText}>Bem-vindo de volta</Text>
                <Text style={styles.headerTitle}>{userRole === "admin" ? "Administrador" : "Farmácia Central"}</Text>
            </View>
            <TouchableOpacity onPress={onLogout}>
                <Text style={{ color: "#fff" }}>logout</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
            {/* Quick Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Vendas</Text>
                <Text style={styles.statValue}>R$ 67.5k</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Pedidos</Text>
                <Text style={styles.statValue}>324</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Estoque</Text>
                <Text style={styles.statValue}>12</Text>
              </View>
            </View>

            {/* Admin-only: Pending Approvals */}
            {userRole === "admin" && pendingApprovals > 0 && (
              <TouchableOpacity style={styles.approvalCard} onPress={() => onNavigate("approvals")}>
                <View style={styles.approvalRow}>
                  <Text style={styles.approvalIcon}>bell</Text>
                  <View>
                    <Text style={styles.approvalTitle}>Aprovações Pendentes</Text>
                    <Text style={styles.approvalText}>
                      {pendingApprovals} {(pendingApprovals as number) === 1 ? "farmácia aguardando" : "farmácias aguardando"} aprovação
                    </Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{pendingApprovals}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}

            {/* Sales Text */}
            <View style={{ padding: 16, borderRadius: 16, backgroundColor: '#fff', margin: 16, elevation: 2 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 12, color: '#1e293b' }}>
        Vendas Mensais
      </Text>
      <View style={{ height: 200, flexDirection: 'row' }}>
        {/* Eixo Y */}
        <YAxis
          data={values}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: '#64748b', fontSize: 10 }}
          numberOfTicks={6}
          formatLabel={value => `R$ ${value / 1000}k`}
        />

        {/* Gráfico de linhas */}
        <View style={{ flex: 1, marginLeft: 8 }}>
          <LineChart
            style={{ flex: 1 }}
            data={values}
            svg={{ stroke: '#3b82f6', strokeWidth: 2 }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid stroke="#e2e8f0" />
          </LineChart>

          {/* Eixo X */}
          <XAxis
            style={{ marginHorizontal: -10, height: 20 }}
            data={values}
            formatLabel={(value, index) => months[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: '#64748b' }}
            scale={scale.scaleBand}
          />
        </View>
      </View>
    </View>

            {/* Top Products Text */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Produtos Mais Vendidos</Text>
              {topProducts.map((item) => (
                <Text key={item.name}>
                  {item.name}: {item.sales} vendas
                </Text>
              ))}
            </View>
        </ScrollView>
        {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                <Text>home</Text>
                <Text style={styles.navLabelMuted}>Início</Text>
            </TouchableOpacity>

        {userRole === "admin" ? (
          <>
            <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("pharmacies")}>
              <Text>building</Text>
              <Text style={styles.navLabelMuted}>Farmácias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("approvals")}>
              <Text>check</Text>
              <Text style={styles.navLabelMuted}>Aprovações</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("stock")}>
              <Text>package</Text>
              <Text style={styles.navLabelMuted}>Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("orders")}>
              <Text>cart</Text>
              <Text style={styles.navLabelMuted}>Pedidos</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("profile")}>
          <Text>user</Text>
          <Text style={styles.navLabelMuted}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  header: { height: 100, paddingTop: 50,backgroundColor: "#3b82f6", padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  welcomeText: { color: "#cfe2fc" },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  statsRow: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#3b82f6", paddingVertical: 12, borderBottomEndRadius: 16 },
  statCard: { backgroundColor: "#a1c4fb8e", padding: 16, borderRadius: 12, width: "30%", height: 120, alignItems: "center", gap: 40 },
  statLabel: { color: "#fff" },
  statValue: { color: "#fff",fontWeight: "bold", fontSize: 16 },
  approvalCard: { backgroundColor: "#fef3c7", padding: 16, borderRadius: 12, marginHorizontal: 16, marginBottom: 16 },
  approvalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  approvalIcon: { fontWeight: "bold", marginRight: 8 },
  approvalTitle: { fontWeight: "bold" },
  approvalText: { color: "#334155" },
  badge: { backgroundColor: "#f59e0b", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: "#fff", fontWeight: "bold" },
  chartCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginHorizontal: 16, marginBottom: 16 },
  chartTitle: { fontWeight: "bold", marginBottom: 8 },
  bottomNav: { height: 100 ,flexDirection: "row", justifyContent: "space-around", alignItems: 'center',backgroundColor: "#fff", paddingVertical: 12, borderTopWidth: 1, borderColor: "#e2e8f0" },
  navItem: { alignItems: "center" },
  navLabelMuted: { color: "#64748b", fontSize: 12 },
});
