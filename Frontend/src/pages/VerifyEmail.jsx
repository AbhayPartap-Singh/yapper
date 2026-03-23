import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    const verify = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth/verify-email?token=${token}`);

        alert("✅ Email verified!");

        // ✅ redirect after verification
        navigate("/dashboard");

      } catch (err) {
        console.error(err);
        alert("❌ Verification failed");
        navigate("/");
      }
    };

    if (token) verify();
  }, []);

  return <h2>Verifying your email...</h2>;
};

export default VerifyEmail;