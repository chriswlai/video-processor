import cv2
import matplotlib.pyplot as plt
import subprocess


plt.style.use('ggplot')
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

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    out = cv2.VideoWriter("out_test.mp4",
                cv2.VideoWriter_fourcc(*"mp4v"),
                fps,
                (width, height))

    processed_frames = []

    # fig, axs = plt.subplots(5,5, figsize=(30,20))
    # axs = axs.flatten()

    while True:
        print(f"Frame {len(processed_frames)} of {total_frames}")
        if len(processed_frames) == total_frames:
            break

        ret,frame = cap.read()
        if not ret:
            print("Error: Failed to read frame from video capture.")
            break
        
        ClassIndex, confidence, bbox = model.detect(frame,confThreshold=0.55)
        if (len(ClassIndex)!=0):
            for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidence.flatten(), bbox):
                if (ClassInd<=80):
                    for item in ClassIndex:
                        newitem = (item - 1)
                        if newitem in labels:
                            pass
                        else:
                            labels.append(newitem)
                    # adds the boxes in the frame
                    # print("asdf")
                    # cv2.rectangle(frame,boxes,(255,0,0),2)
                    # cv2.putText(frame,classLabels[ClassInd-1],(boxes[0]+10,boxes[1]+40),font,fontScale=font_scale,color=(0,255,0),thickness=3)
                    # print("1234")
                    cv2.rectangle(frame, tuple(map(int, boxes)), (255, 0, 0), 2)
                    cv2.putText(frame, classLabels[ClassInd - 1], (int(boxes[0]) + 10, int(boxes[1]) + 40),
                            font, fontScale=font_scale, color=(0, 255, 0), thickness=3)
                    
                processed_frames.append(frame)
                out.write(frame)

                # if (len(processed_frames)) % 10 == 0:
                #     axs[len(processed_frames) // 10 - 1].imshow(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
                #     axs[len(processed_frames) // 10 - 1].axis('off')
                #     axs[len(processed_frames) // 10 - 1].set_title(f"Frame {len(processed_frames)}")
                # if len(processed_frames) == total_frames + 1:
                #     #display_cv2_img(frame)
                #     plt.tight_layout()
                #     plt.show()
                #     plt.pause(0.1)
                #     plt.close()
                #     cap.release()
                #     cv2.destroyAllWindows()
        # cv2.imshow('video',frame)

        if cv2.waitKey(2) & 0xFF == ord('q'):
            break

    out.release()
    cap.release()
    cv2.destroyAllWindows() 

    tmp_output_path = "out_test.mp4"
    output_path = "out_test_compressed.mp4"
    subprocess.run(
        [   
            "ffmpeg",
            "-i",
            tmp_output_path,
            "-crf",
            "18",
            "-preset",
            "veryfast",
            "-vcodec",
            "libx264",
            output_path,
            '-loglevel',
            'quiet'
        ]
    )

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



#---------------TESTING-----------------


def display_cv2_img(img, figsize=(10,10)):
    print("plotting")
    img_ = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    fig, ax = plt.subplots(figsize=figsize)
    ax.imshow(img_)
    ax.axis("off")



def main():
    print(process_video("TTask Vine copy.mp4"))
    return
    
if __name__ == "__main__":
    main()