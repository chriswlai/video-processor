import cv2
import matplotlib.pyplot as plt

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
def process_video(fileName):
    cap = cv2.VideoCapture(fileName)
    labels = []


    # Check if the video is opened correctly
    if not cap.isOpened():
        cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise IOError("Cannot open video")

    font_scale = 3
    font = cv2.FONT_HERSHEY_PLAIN

    while True:
        ret,frame = cap.read()

        ClassIndex, confidence, bbox = model.detect(frame,confThreshold=0.55)

        if (len(ClassIndex)!=0):
            for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidence.flatten(), bbox):
                if (ClassInd<=80) and (conf >= 0.65):
                    for item in ClassIndex:
                        newitem = item - 1
                        if newitem in labels:
                            pass
                        else:
                            labels.append(newitem)
                    cv2.rectangle(frame,boxes,(255,0,0),2)
                    cv2.putText(frame,classLabels[ClassInd-1],(boxes[0]+10,boxes[1]+40),font,fontScale=font_scale,color=(0,255,0),thickness=3)

        cv2.imshow('Object Detection Tutorial',frame)

        if cv2.waitKey(2) & 0xFF == ord('q'):
            break

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

    return new_sentence

def main():
    print(process_video("highway.mp4"))
    return
    
if __name__ == "__main__":
    main()