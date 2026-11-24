# AI Fashion Recommendation and Virtual Try-On System

## 1. Full System Architecture (Text Diagram)

```text
[Frontend Client (React/Vite)]
       |
       | (REST / WebSockets)
       v
[API Gateway (Node.js / FastAPI)]
       |
       +---> [Recommendation Service]
       |          |---> [Visual Feature Extractor (ViT / CLIP)]
       |          |---> [Vector Database (Milvus / Pinecone)]
       |          +---> [Compatibility Scoring Engine]
       |
       +---> [Virtual Try-On Service (GPU Cluster)]
                  |---> [Pose Estimator (YOLO-Pose / OpenPose)]
                  |---> [Human Segmenter (Mask2Former / SAM)]
                  |---> [Proportion & Lighting Estimator]
                  +---> [Generative Model (SDXL Inpainting / TryOn-Net)]
```

## 2. Recommended Model Types

*   **Visual Feature Extraction**:
    *   *Model*: **CLIP** (OpenAI) or fine-tuned **Vision Transformer (ViT)**.
    *   *Role*: Extracts semantic embeddings for color, pattern, texture, fit, and style to power vector similarity search.
*   **Human Pose Detection**:
    *   *Model*: **YOLO-Pose** or **MMPose**.
    *   *Role*: Real-time keypoint extraction (joints, limbs) to preserve body posture during generation.
*   **Human Segmentation**:
    *   *Model*: **Mask2Former** or **Segment Anything Model (SAM)**.
    *   *Role*: Accurately separates upper body, lower body, hair, and hands, ensuring occlusions are handled correctly.
*   **Generative Model (Virtual Try-On)**:
    *   *Model*: **Stable Diffusion XL (SDXL) + ControlNet** OR dedicated Try-On models like **OOTDiffusion**.
    *   *Role*: Inpaints the target garment onto the segmented lower-body region, adhering to the pose keypoints.

## 3. Data Pipeline Design

1.  **Ingestion & Cleaning**: Scrape or ingest catalog images. Perform background removal using `rembg` or similar tools.
2.  **Metadata Tagging**: Pass images through a Vision-Language Model (like LLaVA) to automatically tag: Dominant Colors, Pattern, Fabric, Fit, and Style.
3.  **Embedding Generation**: Generate dense vectors using CLIP and store them in the Vector Database alongside metadata.
4.  **Compatibility Graph**: Pre-compute or define rule-based edges (Color Harmony + Style Compatibility) connecting Tops to Bottoms in a graph database or relational table.

## 4. Training Strategy

*   **Generative Try-On**: 
    *   Fine-tune the generative model using paired datasets like **DressCode** or **VITON-HD**. 
    *   *Inputs*: Person Image, Pose Map, Garment Mask, Target Garment Image.
    *   *Loss*: L1/L2 pixel loss + Perceptual loss (VGG) to ensure high-fidelity texture reproduction.
*   **Compatibility Scoring**:
    *   Train a Siamese Network on expert-curated outfits (e.g., Polyvore dataset) to learn a scoring function (1-10) for how well two embeddings match.

## 5. Inference Flow

1.  **Top Selection**: User inputs a top. The system extracts its visual feature embedding.
2.  **Recommendation**: The Recommendation Service queries the VectorDB to retrieve the top 5 compatible bottoms, ranking them using the scoring engine and color harmony rules.
3.  **Upload & Pre-processing**: User uploads a full-body image. The Try-On Service runs Pose Detection and Segmentation in parallel.
4.  **Parallel Generation**: The generative model runs *batched inference* (or parallel async jobs) to generate the 5 virtual try-on images simultaneously.
5.  **Post-processing**: Upscale outputs (e.g., Real-ESRGAN) and return the images, scores, and metadata to the client.

## 6. Optimization Strategy

*   **Model Optimization**: Export pose and segmentation models to **TensorRT** (ONNX) and run in FP16 precision for ultra-low latency.
*   **Caching**: Cache embeddings and frequent Top-Bottom matches in Redis.
*   **Batching**: Group the 5 generative requests into a single batch for the GPU to maximize VRAM throughput.

## 7. Deployment Approach

*   **Frontend**: Hosted on Vercel or AWS Amplify.
*   **Backend API**: Kubernetes (EKS/GKE) cluster auto-scaling based on request volume.
*   **GPU Inference Nodes**: Use scalable model serving frameworks like **Triton Inference Server** or **Ray Serve** running on NVIDIA L4 or A10G spot instances for cost-effective heavy lifting.
