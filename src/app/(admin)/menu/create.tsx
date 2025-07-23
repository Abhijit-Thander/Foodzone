import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Switch,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { useInsertProduct } from "@/api/products";

const AdminAddItem = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [restaurantname, setRestaurantName] = useState("");
  const [deliverytime, setDeliveryTime] = useState("");
  const [discount, setDiscount] = useState("");

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    restaurantName?: string;
    description?: string;
  }>({});

  const { mutate: insertProduct } = useInsertProduct();

  // Image picker expo
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

   

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  // Create item handler
  const onCreate = () => {
    let newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!restaurantname.trim())
      newErrors.restaurantName = "Restaurant name is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // insert product logic using react query
    insertProduct(
      {
        name,
        image,
        price: parseFloat(price),
        description,
        rating,
        isVeg,
        restaurantname,
        deliverytime,
        discount: parseFloat(discount),
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "New Dish 🍽️",
            position: "top",
            visibilityTime: 2000,
          });
          router.back();
        },
        onError: (error: any) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
            position: "top",
            visibilityTime: 2000,
          });
        },
      }
    );

    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setRating("");
    setIsVeg(false);
    setRestaurantName("");
    setDeliveryTime("");
    setDiscount("");
    setImage(null);
    setErrors({});
  };

  // Update item handler
  const onUpdate = () => {
    Toast.show({
      type: "success",
      text1: "Updated Dish 🍽️",
      position: "top",
      visibilityTime: 2000,
    });

    let newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!restaurantname.trim())
      newErrors.restaurantName = "Restaurant name is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // reset form
    setName("");
    setPrice("");
    setDescription("");
    setRating("");
    setIsVeg(false);
    setRestaurantName("");
    setDeliveryTime("");
    setDiscount("");
    setImage(null);
    setErrors({});

    console.log("🟢 New Item:");
    Alert.alert("Success", "Item updated successfully!");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{ title: isUpdating ? "Edit Dish" : "Create Dish" }}
      />
      <Text style={styles.heading}>Create New Product</Text>

      <Pressable style={styles.imagePicker}>
        <Image
          source={{
            uri:
              image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0vKhECUC_aDd4osI5aoXImtoCkawWNtRqdw&s",
          }}
          style={styles.imagePreview}
        />
        {!image && (
          <View style={styles.overlayTextContainer}>
            <Text style={styles.overlayText}>📷 Add Image</Text>
          </View>
        )}
      </Pressable>
      <Text style={[styles.label, styles.imageLabel]} onPress={pickImage}>
        {" "}
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="e.g. Chicken Biryani"
        placeholderTextColor={"#0000004f"}
        style={[styles.input, errors.name && styles.errorInput]}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors((prev) => ({ ...prev, name: undefined }));
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Price (₹)</Text>
      <TextInput
        placeholder="e.g. 249"
        placeholderTextColor={"#0000004f"}
        style={[styles.input, errors.price && styles.errorInput]}
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => {
          setPrice(text);
          setErrors((prev) => ({ ...prev, price: undefined }));
        }}
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Product description"
        placeholderTextColor={"#0000004f"}
        style={[
          styles.input,
          styles.multiline,
          errors.description && styles.errorInput,
        ]}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setErrors((prev) => ({ ...prev, description: undefined }));
        }}
        multiline
      />

      <Text style={styles.label}>Rating (1-5)</Text>
      <TextInput
        placeholder="e.g. 4.5"
        placeholderTextColor={"#0000004f"}
        style={styles.input}
        keyboardType="decimal-pad"
        value={rating}
        onChangeText={setRating}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Vegetarian?</Text>
        <Switch value={isVeg} onValueChange={setIsVeg} />
      </View>

      <Text style={styles.label}>Restaurant Name</Text>
      <TextInput
        placeholder="e.g. Swiggy Tandoor"
        placeholderTextColor={"#0000004f"}
        style={[styles.input, errors.restaurantName && styles.errorInput]}
        value={restaurantname}
        // onChangeText={setRestaurantName}
        onChangeText={(text) => {
          setRestaurantName(text);
          setErrors((prev) => ({ ...prev, restaurantName: undefined }));
        }}
      />

      <Text style={styles.label}>Delivery Time (mins)</Text>
      <TextInput
        placeholder="e.g. 30"
        placeholderTextColor={"#0000004f"}
        style={styles.input}
        keyboardType="number-pad"
        value={deliverytime}
        onChangeText={setDeliveryTime}
      />

      <Text style={styles.label}>Discount % (optional)</Text>
      <TextInput
        placeholder="e.g. 20"
        placeholderTextColor={"#0000004f"}
        style={styles.input}
        keyboardType="numeric"
        value={discount}
        onChangeText={setDiscount}
      />

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>
          {isUpdating ? "Update Product" : "Create Product"}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default AdminAddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#383838",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",
  },
  imageLabel: {
    alignSelf: "center",
    fontSize: 15,
    marginVertical: 8,
    fontWeight: "600",
    letterSpacing: 1,
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    color: Colors.light.tint,
    fontWeight: "500",
    fontStyle: "italic",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 160,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
  },

  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlayTextContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(44, 44, 44, 0.71)",
  },

  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginTop: -12,
    marginBottom: 12,
    fontSize: 13,
  },
  errorInput: {
    borderColor: "red",
  },
  submitButton: {
    backgroundColor: "#14CF93",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
