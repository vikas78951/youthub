import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },

  hero: {
    height: "100%",
    width: "100%",
    maxWidth: "45%",
  },

  image: {
    height: "100%",
    width: "100%",
  },

  formContainer: {
    height: "100%",
    flexGrow: 1,
    padding: 20,
    overflowY: "auto",
  },

  form: {
    height: "100%",
    width: "100%",
    maxWidth: 420,
    display: "flex",
    justifyContent: "center",
    marginHorizontal: "auto",
    flexShrink: 1,
  },
});
