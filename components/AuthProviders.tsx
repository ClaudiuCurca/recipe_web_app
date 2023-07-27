"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    fetchProviders();
  }, []);

  // i only have one provider: google this is why I Say only 'Sign in'
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((p: Provider, i) => (
          <button key={i} onClick={() => signIn(p?.id)} className="text-white">
            Sign in
          </button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
