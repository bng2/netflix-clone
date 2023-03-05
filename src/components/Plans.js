import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";
import { db } from "../lib/firebase";
import { loadStripe } from "@stripe/stripe-js";
import "./Plans.css";

export const Plans = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_start:
              subscription.data().current_period_start.seconds,
            current_period_end: subscription.data().current_period_end.seconds,
          });
        });
      });
  }, [user.uid]);

  // Use the collectionRef instance to retrieve the "active" products
  const getProducts = () => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          // retrieve the prices collection
          const prices = await productDoc.ref.collection("prices").get();
          // for multiple prices
          prices.docs.forEach((price) => {
            // create object to hold price data
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        // update the products state
        setProducts(products);
      });
  };

  // Get the list of plans
  useEffect(() => {
    getProducts();
  }, []); // Only on component mount

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin, // returns user to original window
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // Only init Stripe when we have a valid session
        const stripe = await loadStripe(
          `${process.env.REACT_APP_STRIPE_TEST_KEY}`
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans">
      <br />
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPlan = productData.name
          .toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPlan && "plans__plan--disabled"
            } plans__plan`}
          >
            <div className="plans__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              className="plans__subscribe"
              onClick={() =>
                !isCurrentPlan && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPlan ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
