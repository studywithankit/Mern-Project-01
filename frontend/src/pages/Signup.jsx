import { useState } from "react";
import api from "../api/axios.js";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })
  ;
}