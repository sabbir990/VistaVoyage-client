import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import '../Styles/CheckoutForm.css';
import toast from 'react-hot-toast';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import useAuth from '../Hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import useRole from '../Hooks/useRole';

const CheckoutForm = ({ price, selectedForCheckout, selectedGuide }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosCommon = useAxiosCommon();
    const [clientSecret, setClientSecret] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const {role} = useRole();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: async (paymentObject) => {
            const { data } = await axiosCommon.post(`/save-payment-details`, paymentObject);
            return data
        },

        onSuccess: () => {
            setIsLoading(false);
            toast.success("Your Payment is successful!");
        }
    })

    const priceNumber = parseInt(price) || 0;

    useEffect(() => {
        if (priceNumber > 0) {
            const fetchPaymentSecret = async () => {
                setIsLoading(true);
                try {
                    const { data: { clientSecret } } = await axiosCommon.post('/create-payment-intent', { price: priceNumber });
                    setClientSecret(clientSecret);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch your client secret. Error: " + error.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPaymentSecret();
        }
    }, [priceNumber, axiosCommon]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!selectedGuide) {
            setIsLoading(false);
            return toast.error("Select your guide first!")
        }

        if (!stripe || !elements || !clientSecret) {
            return;  // Ensure all necessary resources are ready before proceeding
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Create a payment method with Stripe
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error('[Payment Error]', error);
            toast.error("Payment failed: " + error.message);
            return;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })

        if (confirmError) {
            setIsLoading(false);
            console.log(confirmError);
            toast.error(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentObject = {
                ...selectedForCheckout,
                transactionId: paymentIntent.id,
                guide: selectedGuide,
                paid: priceNumber,
            }

            delete paymentObject._id

            const savedResponse = await mutateAsync(paymentObject);

            if (savedResponse.insertedId) {
                navigate(`/invoice/${savedResponse.insertedId}`)
                setIsLoading(false)
            }

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary btn-block' type="submit" disabled={!stripe || isLoading || !clientSecret || !user || role !== 'user'}>
                {
                    isLoading ? <ImSpinner3 className='animate-spin' /> : 'Pay'
                }
            </button>
        </form>
    );
};

export default CheckoutForm;
