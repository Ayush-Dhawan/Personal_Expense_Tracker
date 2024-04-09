
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://nuwjrrfigxfaxkmulvff.supabase.co',
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d2pycmZpZ3hmYXhrbXVsdmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2ODE1OTAsImV4cCI6MjAyODI1NzU5MH0.ZIfUgFo83W6YmiaXtmHlMX31I0O_7W7eY0Zqz-lSjhA')