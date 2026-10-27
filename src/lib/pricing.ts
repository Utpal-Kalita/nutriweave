export const CHECKOUT_PROMO_DISCOUNT = 30;

export function getSubscriptionRate(frequency: string) {
  if (frequency === 'monthly') return 0.1;
  if (frequency === 'biweekly') return 0.05;
  return 0;
}

export function calculateOrderPricing(
  unitPrice: number,
  quantity: number,
  frequency: string,
  promoDiscount = CHECKOUT_PROMO_DISCOUNT,
) {
  const subtotal = unitPrice * quantity;
  const subscriptionDiscount = Math.round(subtotal * getSubscriptionRate(frequency));
  const discountedSubtotal = subtotal - subscriptionDiscount;
  const appliedPromoDiscount = Math.min(promoDiscount, discountedSubtotal);

  return {
    subtotal,
    subscriptionDiscount,
    promoDiscount: appliedPromoDiscount,
    total: Math.max(0, discountedSubtotal - appliedPromoDiscount),
  };
}
