import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/selfie_segmentation';

(async () => {
    // const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
    // const segmenterConfig = {
    //     runtime: 'mediapipe',
    //     solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation'
    //     // or 'base/node_modules/@mediapipe/selfie_segmentation' in npm.
    // };
    // segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);

    const model = bodySegmentation.SupportedModels.BodyPix;
    const segmenterConfig = {
      architecture: 'ResNet50',
      outputStride: 32,
      quantBytes: 2,
      runtime: 'mediapipe',
    };
    let segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);

    const screen = document.getElementById('screen');

    const segmentationConfig = { flipHorizontal: false };
    const people = await segmenter.segmentPeople(screen, segmentationConfig);
    console.log(people);

})();