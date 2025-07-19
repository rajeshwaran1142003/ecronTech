import { supabase } from './supabase';

// Newsletter subscription interface
export interface NewsletterSubscription {
  email: string;
  created_at?: string;
}

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email.toLowerCase().trim() }]);

    if (error) {
      // Handle duplicate email error
      if (error.code === '23505') {
        return { success: false, error: 'This email is already subscribed to our newsletter' };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: 'Failed to subscribe. Please try again.' };
  }
};

// Get all newsletter subscriptions (admin only)
export const getNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('email, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return [];
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('email', email.toLowerCase().trim());

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return { success: false, error: 'Failed to unsubscribe. Please try again.' };
  }
};