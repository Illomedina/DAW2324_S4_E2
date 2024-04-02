import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "/src/locales/eng/translation.json";
import translationCA from "/src/locales/cat/translation.json";
import translationES from "/src/locales/esp/translation.json";

const resources = {
  eng: {
    translation: translationEN,
  },
  cat: {
    translation: translationCA,
  },
  esp: {
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "eng",
  fallbackLng: "eng",
  interpolation: {
    escapeValue: false,
  },
});

const OrderDetailsPage = () => {
  const { t } = useTranslation();
  const { idOrder } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/OrderDetails/${idOrder}`
      );
      if (result.ok) {
        const data = await result.json();
        setOrderDetails(data);
      } else if (result.status === 429) {
        console.log("Too Many Requests. Retrying in 5 seconds...");
        setTimeout(() => fetchData(), 5000);
      } else {
        console.error("Error fetching data. Status:", result.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    // Verificar que idOrder tenga un valor antes de realizar la solicitud
    if (idOrder) {
      fetchData();
    }
  }, [idOrder]);

  return (
    <AppLayout>
      <div className="flex items-center justify-center">
        <div className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
            alt="chippz"
            className="mx-auto w-16 py-4"
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="font-semibold">CustomAIze</h4>
            <p className="text-xs"></p>
          </div>
          {orderDetails.map((order, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 border-b py-6 text-xs"
            >
              <p className="flex justify-between">
                <span className="text-gray-400">{t("Order Number:")}</span>
                <span>{order.idOrder}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">{t("Shipping Price:")}</span>
                <span>{order.shippingPrice}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">{t("Customer:")}</span>
                <span>Roger Arques</span>
              </p>
              <table className="w-full text-left mt-4">
                <thead>
                  <tr className="flex">
                    <th className="w-full py-2">{t("Product")}</th>
                    <th className="min-w-[44px] py-2">{t("QTY")}</th>
                    <th className="min-w-[44px] py-2">{t("VAR")}</th>
                    <th className="min-w-[44px] py-2">{t("Total")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Asumiendo que orderDetails ahora incluye un array de productos en cada pedido */}
                  {orderDetails.map((product, productIndex) => (
                    <tr key={productIndex} className="flex">
                      <td className="flex-1 py-1">{product.idProduct}</td>
                      <td className="min-w-[44px]">{product.quantity}</td>
                      <td className="min-w-[44px]">{product.idVariant}</td>
                      <td className="min-w-[44px]">{product.priceEach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div className="py-4 justify-center items-right flex flex-col gap-2 ">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OrderDetailsPage;
