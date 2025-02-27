import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscriptionmodel.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  
  if (!subscriptionId) {
    console.error("No subscription ID provided.");
    return;
  }

  // 🛠️ Ensure fetching subscription is inside `context.run`
  const subscription = await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  });

  if (!subscription || subscription.status !== 'active') {
    console.log(`Subscription ${subscriptionId} is inactive or does not exist.`);
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if (reminderDate.isAfter(dayjs())) {
      await context.sleepUntil(`Reminder ${daysBefore} days before`, reminderDate.toDate());
    }

    await context.run(`${daysBefore} days before reminder`, async () => {
      console.log(`Triggering reminder ${daysBefore} days before renewal.`);
      await sendReminderEmail({
        to: subscription.user.email,
        type: `${daysBefore} days before reminder`,
        subscription,
      });
    });
  }
});
