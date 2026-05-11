-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'user'::user_role,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Create products table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  level INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone."
  ON public.products FOR SELECT
  USING ( true );

CREATE POLICY "Only admins can insert products."
  ON public.products FOR INSERT
  WITH CHECK ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') );

CREATE POLICY "Only admins can update products."
  ON public.products FOR UPDATE
  USING ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') );

CREATE POLICY "Only admins can delete products."
  ON public.products FOR DELETE
  USING ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') );

-- Create orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL, -- kept for historical records if product is deleted
  total_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  size TEXT,
  frequency TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders."
  ON public.orders FOR SELECT
  USING ( auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') );

CREATE POLICY "Users can insert their own orders."
  ON public.orders FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Admins can update orders."
  ON public.orders FOR UPDATE
  USING ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert dummy product data
INSERT INTO public.products (name, description, price, image_url, level) VALUES
('Premium Sona Masuri', 'Aged 12 months for perfect texture. Ideal for daily consumption.', 249, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg', 5),
('Brown Basmati Match', 'High fiber, low GI rice perfect for sustained energy.', 320, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop', 4),
('Quinoa Blend', 'Protein-rich blend for active lifestyles.', 450, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop', 3);
