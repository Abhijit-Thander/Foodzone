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
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { useInsertProduct, useProduct, useUpdateProduct } from "@/api/products";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";

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

  const params = useLocalSearchParams();
  const id = params?.id ? Number(params.id) : undefined;

  const isUpdating = !!id;
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    restaurantName?: string;
    description?: string;
  }>({});

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id as number);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name ?? "");
      setPrice(updatingProduct.price.toString() ?? 0);
      setDescription(updatingProduct.description ?? "");
      setRating((updatingProduct.rating ?? "").toString());
      setIsVeg(updatingProduct.isVeg ?? false);
      setRestaurantName(updatingProduct.restaurantname ?? "");
      setDeliveryTime((updatingProduct.deliverytime ?? 0).toString());
      setDiscount(
        updatingProduct.discount != null
          ? updatingProduct.discount.toString()
          : "0"
      );
      setImage(updatingProduct.image ?? "");
    }
  }, [updatingProduct]);

  // Image picker expo
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (result.canceled) {
      Toast.show({
        type: "info",
        text1: "Image selection cancelled",
        position: "bottom",
      });
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload image to Supabase
  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
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

  const resetForm = () => {
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
  // Create item handler
  const onCreate = async () => {
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

    // Upload image if selected
    const imagePath = await uploadImage();

    // insert product logic using react query
    insertProduct(
      {
        name,
        image: imagePath || null, // Use uploaded image path or null
        price: parseFloat(price),
        description,
        rating: rating ? parseFloat(rating) : 0,
        isVeg,
        restaurantname,
        deliverytime: deliverytime ? parseInt(deliverytime) : 0,
        discount: parseFloat(discount),
        imagePath, // Use uploaded image path or null
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "New Dish 🍽️",
            position: "top",
            visibilityTime: 2000,
          });
          resetForm();
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
  };

  // Update item handler
  const onUpdate = () => {
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

    if (!id) {
      Toast.show({
        type: "error",
        text1: "Update Error",
        text2: "Invalid product ID",
      });
      return;
    }
    updateProduct(
      {
        id,
        name,
        image: image || null,
        price: parseFloat(price),
        description,
        rating: parseFloat(rating),
        isVeg,
        restaurantname,
        deliverytime: parseInt(deliverytime),
        discount: parseFloat(discount),
      },

      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Udate The Dish 🍽️",
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
          console.log(error.message);
        },
      }
    );

    //reset form
    resetForm();
    console.log("🧪 Update ID:", id);
    console.log("✅ Supabase response:", updateProduct);
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
