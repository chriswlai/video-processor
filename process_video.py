import cv2
import matplotlib.pyplot as plt
import subprocess

config_file = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
frozen_model = 'frozen_inference_graph.pb'

model = cv2.dnn_DetectionModel(frozen_model,config_file)

classLabels = []
file_name = 'labels.txt'
with open(file_name,'rt') as fpt:
    classLabels = fpt.read().rstrip('\n').split('\n')

# print(classLabels)
model.setInputSize(320,320)
model.setInputScale(1.0/127.5) #255/2 = 127.5
model.setInputMean((127.5,127.5,127.5)) #mobilenet => [-1,1]
model.setInputSwapRB(True)


# Video demo
def process_video(fileName, outPath):

    cap = cv2.VideoCapture(fileName)
    labels = []


    # Check if the video is opened correctly
    if not cap.isOpened():
        cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise IOError("Cannot open video")

    font_scale = 3
    font = cv2.FONT_HERSHEY_PLAIN

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(total_frames)

    processed_frames = []

    while True:
        ret,frame = cap.read()

        ClassIndex, confidence, bbox = model.detect(frame,confThreshold=0.55)

        if (len(ClassIndex)!=0):
            for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidence.flatten(), bbox):
                if (ClassInd<=80):
                    for item in ClassIndex:
                        newitem = item - 1
                        if newitem in labels:
                            pass
                        else:
                            labels.append(newitem)
                    cv2.rectangle(frame,boxes,(255,0,0),2)
                    cv2.putText(frame,classLabels[ClassInd-1],(boxes[0]+10,boxes[1]+40),font,fontScale=font_scale,color=(0,255,0),thickness=3)
                    processed_frames.append(frame)
        # cv2.imshow('video',frame)

        if cv2.waitKey(2) & 0xFF == ord('q'):
            break

    # width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    # height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    # fps = cap.get(cv2.CAP_PROP_FPS)

    # print(width)
    # print(height)
    # print(fps)

    # fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    # out = cv2.VideoWriter(outPath, fourcc, 30.0, (frame.shape[1], frame.shape[0]))
    print(len(processed_frames))
    # Video parameters
    width, height = processed_frames[0].shape[1], processed_frames[0].shape[0]
    fps = 30
    output_file = 'output.mp4'

    # Create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_file, fourcc, fps, (width, height))

    # Write frames to the video file
    for frame in processed_frames:
        out.write(frame)

    # Release the VideoWriter
    out.release()

    out = cv2.VideoWriter(outPath, fourcc, fps, (width, height))
    for frame in processed_frames:
        if frame.size == 0:
            print('Error: Invalid frame dimensions in the list.')
            break
        out.write(frame)
    
    cap.release()
    cv2.destroyAllWindows() 


    i = 0
    new_sentence = []
    for label in labels:
        if i == 0:
            new_sentence.append(f"I found a {classLabels[label]}, ")
        elif i == (len(labels) - 1):
                new_sentence.append(f"and a {classLabels[label]}.")
        else:
            new_sentence.append(f"a {classLabels[label]}, ")
        i += 1

    return ''.join(new_sentence)

def main():
    print(process_video("highway.mp4", "write.mp4"))
    return
    
if __name__ == "__main__":
    main()