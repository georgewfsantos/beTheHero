import React from "react";
import { Feather } from "@expo/vector-icons";
import * as MailComporser from "expo-mail-composer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import logo from "../../assets/logo.png";

import styles from "./styles";

export default function Details() {
  const route = useRoute();

  const incident = route.params.incident;

  const navigation = useNavigation();
  const message = `Olá ${
    incident.name
  }. Estou entrando em contato porque gotaria de ajudar no caso ${
    incident.title
  } com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}`;

  function handleBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComporser.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
      // for Brazil, the number format should be 559________
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}-{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.boxHeaderText}>Salve o dia!</Text>
        <Text style={styles.boxHeaderText}>Seja o herói desse caso.</Text>

        <Text style={styles.contactOptionsTitle}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
