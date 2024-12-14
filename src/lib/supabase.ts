import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, bucket: string, path: string) => {
  console.log('Starting image upload:', { bucket, path });
  
  // First check if file exists at path and remove it
  const { data: existingFile } = await supabase.storage
    .from(bucket)
    .list(path.split('/')[0], {
      limit: 1,
      offset: 0,
      search: path.split('/')[1]
    });

  if (existingFile && existingFile.length > 0) {
    console.log('Removing existing file:', path);
    await supabase.storage
      .from(bucket)
      .remove([path]);
  }

  // Upload new file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      cacheControl: '3600'
    });

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  console.log('Upload successful:', data);

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  console.log('Generated public URL:', publicUrl);
  return publicUrl;
};