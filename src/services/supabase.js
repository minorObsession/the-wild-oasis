import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wovrvzctmrqyweptumsw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdnJ2emN0bXJxeXdlcHR1bXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NDUzMzgsImV4cCI6MjAzNzQyMTMzOH0.QmqsavxLGCv4aL0C-WH71BpYsFJYx4AZFz0RKnQpE3Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
