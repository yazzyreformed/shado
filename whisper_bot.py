import sys
import os
import whisper
from whisper.utils import get_writer

def generate_vtt(video_path):
    print(f"Loading Whisper model (base)...")
    # You can change 'base' to 'small', 'medium', or 'large' for better accuracy but slower speed
    model = whisper.load_model("base")
    
    print(f"Transcribing {video_path}...")
    result = model.transcribe(video_path)
    
    # Get the directory of the video file to save the VTT there
    output_dir = os.path.dirname(video_path) or "."
    
    # Save as VTT
    vtt_writer = get_writer("vtt", output_dir)
    
    vtt_writer(result, video_path)
    
    vtt_filename = os.path.splitext(os.path.basename(video_path))[0] + ".vtt"
    full_output_path = os.path.join(output_dir, vtt_filename)
    print(f"Success! VTT file generated at: {full_output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python whisper_bot.py <path_to_video.mp4>")
        sys.exit(1)
        
    video_file = sys.argv[1]
    if not os.path.exists(video_file):
        print(f"Error: Could not find file {video_file}")
        sys.exit(1)
        
    generate_vtt(video_file)
