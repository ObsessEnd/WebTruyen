
    const initData = [
        {
            id: 1,
            title: "Quỷ Bí Chi Chủ",
            author: "Ái Tiềm Thủy Đích Ô Tặc",
            categories: ["Huyền Huyễn", "Dị Giới", "Trinh Thám", "Linh Dị"],
            cover: "images/covers/quy-bi-chi-chu.jpg",
            description: "Tỉnh lại sau giấc ngủ, Chu Minh Thụy phát hiện mình đã biến thành Klein Moretti... Trong trào lưu hơi nước cùng máy móc, ai mới là người có thể chạm tới những bí ẩn của phi phàm?",
            views: 3500000,
            votes: 85000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1432,
            updateTime: "2 ngày trước"
        },
        {
            id: 2,
            title: "Bách Luyện Thành Thần",
            author: "Ân Tứ Giải Thoát",
            categories: ["Huyền Huyễn", "Đông Phương", "Dị Giới"],
            cover: "images/covers/truyen-bach-luyen-thanh-than.jpg",
            description: "Từ một thiếu gia của một gia tộc lớn suy tàn, La Chinh biến thành một đống nhục thân bị người ta đánh đập... Vô tình có được cuốn sách thần bí, từng bước vươn lên đỉnh cao vũ trụ.",
            views: 2800000,
            votes: 42000,
            status: "Đang ra",
            isHot: true,
            latestChapter: 3950,
            updateTime: "1 giờ trước"
        },
        {
            id: 3,
            title: "Toàn Tri Độc Giả (Omniscient Reader)",
            author: "Sing-Shong",
            categories: ["Mạt Thế", "Hệ Thống", "Light Novel", "Dị Năng"],
            cover: "images/covers/toan-tri-doc-gia.jpg",
            description: "Kim Dokja, một nhân viên văn phòng bình thường, là độc giả duy nhất của một cuốn tiểu thuyết mạng dài ba ngàn chương. Một ngày nọ, thế giới thực đột nhiên biến thành bối cảnh của cuốn tiểu thuyết đó...",
            views: 4200000,
            votes: 95000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 551,
            updateTime: "1 tuần trước"
        },
        {
            id: 4,
            title: "Võ Luyện Đỉnh Phong",
            author: "Mạc Mặc",
            categories: ["Huyền Huyễn", "Đông Phương"],
            cover: "images/covers/vo-luyen-dinh-phong.jpg",
            description: "Võ đạo đỉnh phong, là cô độc, là tịch mịch, là từ từ cầu tác... Dương Khai, vô tình thu được một cuốn Hắc thư thần bí, bước lên con đường võ đạo huy hoàng.",
            views: 5500000,
            votes: 120000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 6009,
            updateTime: "1 tháng trước"
        },
        {
            id: 5,
            title: "Đồ Đệ Của Ta Đều Là Trùm Phản Diện",
            author: "Mưu Sinh Nhâm Chuyển Bồng",
            categories: ["Hệ Thống", "Tiên Hiệp", "Xuyên Không"],
            cover: "images/covers/do-de-cua-ta-deu-la-trum-phan-dien.jpg",
            description: "Lục Châu tỉnh lại sau giấc ngủ phát hiện mình đã trở thành thế gian cường đại nhất ma đầu tổ sư gia. Dựa vào hệ thống, hắn bắt đầu dạy dỗ lại đám đồ đệ hư hỏng này.",
            views: 1800000,
            votes: 25000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 1823,
            updateTime: "3 tháng trước"
        },
        {
            id: 6,
            title: "Đỉnh Cấp Khí Vận, Lặng Lẽ Tu Luyện Ngàn Năm",
            author: "Nhâm Ngã Tiếu",
            categories: ["Tiên Hiệp", "Hệ Thống", "Trọng Sinh"],
            cover: "images/covers/dinh-cap-khi-van-lang-le-tu-luyen-ngan-nam.jpg",
            description: "Chuyển sinh tới tu tiên giới, Hàn Tuyệt phát hiện mình mang theo trò chơi thuộc tính. Mặc cho bên ngoài tinh phong huyết vũ, hắn quyết định trốn trong núi cẩu thả tu luyện tới vô địch.",
            views: 2100000,
            votes: 38000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1192,
            updateTime: "4 tháng trước"
        },
        {
            id: 7,
            title: "Mạt Thế Trọng Sinh Chi Phân Thân",
            author: "Thất Bát Cuồng",
            categories: ["Mạt Thế", "Trọng Sinh", "Khoa Huyễn"],
            cover: "images/covers/mat-the-trong-sinh-chi-phan-than.jpg",
            description: "Trọng sinh về thời điểm trước khi mạt thế bộc phát một tháng, Liễu Mục đạt được một cái phân thân thần kỳ, từng bước chế tạo ra một chiêu hồn đại quân hoành tảo mạt thế.",
            views: 850000,
            votes: 12000,
            status: "Đang ra",
            isHot: false,
            latestChapter: 452,
            updateTime: "12 giờ trước"
        },
        {
            id: 8,
            title: "Phàm Nhân Tu Tiên",
            author: "Vong Ngữ",
            categories: ["Tiên Hiệp", "Đông Phương"],
            cover: "images/covers/pham-nhan-tu-tien.jpg",
            description: "Hàn Lập, một thiếu niên bình thường xuất thân bần hàn, cơ duyên xảo hợp gia nhập vào một tiểu môn phái giang hồ. Dựa vào tâm tư kín đáo, hắn từng bước đi lên trên con đường tu tiên.",
            views: 6000000,
            votes: 150000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 2446,
            updateTime: "2 năm trước"
        },
        {
            id: 9,
            title: "Đại Phụng Đả Canh Nhân",
            author: "Mại Báo Tiểu Lang Quân",
            categories: ["Xuyên Không", "Lịch Sử", "Trinh Thám"],
            cover: "images/covers/dai-phung-da-canh-nhan-convert.jpg",
            description: "Hứa Thất An tốt nghiệp trường cảnh sát xuyên không đến, dựa vào tri thức phá án hiện đại để phá giải các kỳ án, từng bước thăng tiến trong Đại Phụng.",
            views: 3200000,
            votes: 88000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 1045,
            updateTime: "1 năm trước"
        },
        {
            id: 10,
            title: "Ngã Sư Huynh Thật Sự Quá Vững Vàng",
            author: "Ngôn Quy Chính Truyện",
            categories: ["Tiên Hiệp", "Xuyên Không"],
            cover: "images/covers/nga-su-huynh.jpg",
            description: "Trọng sinh về thời kỳ phong thần, Lý Trường Thọ vì muốn sống sót nên cố gắng không dính nhân quả. Hành sự nguyên tắc: Cẩu thả là trên hết, ẩn tàng tu vi, mưu định rồi mới động.",
            views: 1950000,
            votes: 45000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 765,
            updateTime: "5 tháng trước"
        },
        {
            id: 11,
            title: "Trấn Thủ Biên Quan: Ta Lấy Thân Thể Thành Thánh",
            author: "Đương Thời Minh Nguyệt Thanh",
            categories: ["Kiếm Hiệp", "Ngôn Tình", "Ngược"],
            cover: "images/covers/ta-lay-than-the-thanh-thanh.jpg",
            description: "Trần Hạo, một kiếm khách tài hoa nhưng bạc mệnh, xuyên không đến thế giới võ hiệp cổ đại. Bằng thân thể cường đại và trí tuệ hiện đại, hắn từng bước chấn hưng môn phái, đồng thời trải qua những mối tình đầy bi thương.",
            views: 8900000,
            votes: 210000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 40,
            updateTime: "Nhiều năm trước"
        },
        {
            id: 12,
            title: "Toàn Chức Cao Thủ",
            author: "Hồ Điệp Lam",
            categories: ["Võng Du", "Đô Thị", "Light Novel"],
            cover: "images/covers/toan-chuc-cao-thu.jpg",
            description: "Diệp Tu - đại thần đỉnh cấp bị ép giải nghệ. Hắn làm việc tại một tiệm net nhỏ, mang theo vũ khí tự chế, một lần nữa quay lại đỉnh vinh quang.",
            views: 4500000,
            votes: 110000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1728,
            updateTime: "3 năm trước"
        },
        {
            id: 13,
            title: "Minh Nguyệt Chiếu Cửu Châu",
            author: "Nam Lục Tinh Ly",
            categories: ["Ngôn Tình", "Xuyên Không", "Lịch Sử", "Ngược"],
            cover: "images/covers/minh-nguyet-chieu-cuu-chau.jpg",
            description: "【 chính văn kết thúc 】- Văn án - # ta nữ giả nam trang bị Thái Tử phát hiện, hắn mạnh mẽ đem ta tháo xuống ＃【 nữ giả nam trang thanh lãnh thế tử vs cường thủ hào đoạt điên phê Thái Tử 】Trấn Nam Vương thế tử phó về đề như đi trên băng mỏng thủ một bí mật. Nàng kỳ thật là thế tử thân muội muội, tự nguyện nữ giả nam trang thế thân mất tích nhiều năm ca ca nhập kinh vì chất.Phó về đề ở trong cung cẩn thận chặt chẽ, không ngờ vẫn là bị người xuyên qua ngụy trang.",
            views: 3100000,
            votes: 75000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 120,
            updateTime: "5 năm trước"
        },
        {
            id: 14,
            title: "Ma Đạo Tổ Sư",
            author: "Mặc Hương Đồng Khứu",
            categories: ["Đam Mỹ", "Tiên Hiệp", "Linh Dị"],
            cover: "images/covers/ma-dao-to-su.jpg",
            description: "Ngụy Vô Tiện bị vạn người thóa mạ đã chết. Mười ba năm sau, hắn được hiến xá trọng sinh, cùng Lam Vong Cơ lật lại những bí ẩn đẫm máu năm xưa.",
            views: 5200000,
            votes: 180000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 119,
            updateTime: "4 năm trước"
        },
        {
            id: 15,
            title: "Trực Tiếp Đoán Mệnh: Bắt Đầu Kế Thừa Hương Hỏa Cửa Hàng",
            author: "Du Du",
            categories: ["Quan Trường", "Đô Thị", "Trọng Sinh"],
            cover: "images/covers/bat-dau-ke-thua-huong-hoa-cua-hang.jpg",
            description: " ",
            views: 1200000,
            votes: 15000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 2135,
            updateTime: "2 năm trước"
        },
        {
            id: 16,
            title: "Cẩm Y Dạ Hành",
            author: "Nguyệt Quan",
            categories: ["Lịch Sử", "Quân Sự", "Trinh Thám"],
            cover: "images/covers/cam-y-da-hanh.jpg",
            description: "Xuyên không về đầu triều Minh, Hạ Tầm trở thành Cẩm Y Vệ, giúp Chu Lệ đoạt ngôi vị hoàng đế, kiến công lập nghiệp.",
            views: 2400000,
            votes: 42000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 1042,
            updateTime: "6 năm trước"
        },
        {
            id: 17,
            title: "Mau Xuyên Cứu Vớt Nam Phụ",
            author: "Mật Đào",
            categories: ["Xuyên Nhanh", "Ngôn Tình", "Hệ Thống", "Sủng"],
            cover: "images/covers/mau-cuu-nam-phu.jpg",
            description: "Nữ chính bị trói buộc với hệ thống, phải xuyên qua vô số thế giới để cứu vớt các nam phụ thâm tình có kết cục bi thảm.",
            views: 1600000,
            votes: 55000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 685,
            updateTime: "1 năm trước"
        },
        {
            id: 18,
            title: "Cô Vợ Ngọt Ngào Có Chút Bất Lương",
            author: "Quẫn Quẫn Hữu Yêu",
            categories: ["Ngôn Tình", "Đô Thị", "Trọng Sinh", "Sủng"],
            cover: "images/covers/co-vo.jpg",
            description: "Sống lại một đời, nàng rũ bỏ lớp ngụy trang xấu xí, tự tay vả mặt tra nam tiện nữ, ôm chặt đùi vàng của vị tổng tài bá đạo.",
            views: 3800000,
            votes: 125000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 2460,
            updateTime: "2 năm trước"
        },
        {
            id: 19,
            title: "Linh Vũ Thiên Hạ",
            author: "Vũ Phong",
            categories: ["Huyền Huyễn", "Dị Giới", "Xuyên Không", "Sắc"],
            cover: "images/covers/linh-vu-thien-ha.jpg",
            description: "Lục Thiếu Du xuyên không đến dị giới, dựa vào thiên phú song tu Linh - Vũ chưa từng có, đạp phá thiên địa, bước lên thần đài cao nhất.",
            views: 4800000,
            votes: 68000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 5024,
            updateTime: "5 năm trước"
        },
        {
            id: 20,
            title: "Dò Hư Lăng",
            author: "Quân Sola",
            categories: ["Bách Hợp", "Trinh Thám", "Linh Dị"],
            cover: "images/covers/do-hu-lang.jpg",
            description: "Hai nữ chính cùng nhau thám hiểm các lăng mộ cổ xưa, giải mã những hiện tượng siêu nhiên và nảy sinh tình cảm sâu đậm.",
            views: 950000,
            votes: 32000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 380,
            updateTime: "3 năm trước"
        },
        {
            id: 21,
            title: "Thiên Tài Độc Phi",
            author: "Giới Mạt",
            categories: ["Ngôn Tình", "Xuyên Không", "Dị Năng"],
            cover: "images/covers/thien-tai-doc-phi.jpg",
            description: "Nàng là thiên tài độc thuật của hiện đại, xuyên không nhập vào thân thể phế vật vương phi. Bằng một tay độc thuật tuyệt thế, nàng khiến cả thiên hạ phải run sợ.",
            views: 2200000,
            votes: 56000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1056,
            updateTime: "2 năm trước"
        },
        {
            id: 22,
            title: "Siêu Thần Cơ Khí Sư",
            author: "Tề Bội Giáp",
            categories: ["Khoa Huyễn", "Võng Du", "Xuyên Không", "Trọng Sinh"],
            cover: "images/covers/sieu-than-co-gioi-su.jpg",
            description: "Hàn Tiêu mang theo trí nhớ kiếp trước xuyên vào NPC trong trò chơi Tinh Hải, từng bước trở thành truyền kỳ của vũ trụ.",
            views: 3900000,
            votes: 115000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1463,
            updateTime: "1 năm trước"
        },
        {
            id: 23,
            title: "Tuyệt Thế Đường Môn",
            author: "Đường Gia Tam Thiếu",
            categories: ["Huyền Huyễn", "Dị Năng", "Dị Giới"],
            cover: "images/covers/tuyet-the-duong-mon.jpg",
            description: "Hàng vạn năm sau Đấu La Đại Lục, Hoắc Vũ Hạo vô tình đạt được hồn hoàn trăm vạn năm, bắt đầu hành trình chấn hưng Đường Môn đang dần suy tàn.",
            views: 4100000,
            votes: 92000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 622,
            updateTime: "8 năm trước"
        },
        {
            id: 24,
            title: "Yêu Em Từ Cái Nhìn Đầu Tiên",
            author: "Cố Mạn",
            categories: ["Ngôn Tình", "Đô Thị", "Võng Du", "Sủng", "Đoản Văn"],
            cover: "images/covers/yeu-em-tu-cai-nhin-dau-tien.jpg",
            description: "Cuộc tình lãng mạn nhẹ nhàng bắt đầu từ trong game Mộng Du Giang Hồ cho đến ngoài đời thực giữa hoa khôi Bối Vy Vy và đại thần Tiêu Nại.",
            views: 5600000,
            votes: 215000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 48,
            updateTime: "Nhiều năm trước"
        },
        {
            id: 25,
            title: "Ám Dục",
            author: "Thánh Yêu",
            categories: ["Ngôn Tình", "Đô Thị", "Ngược", "Sắc"],
            cover: "images/covers/am-duc.jpg",
            description: "Một mối tình đầy dằn vặt, chiếm đoạt và tổn thương giữa Nam Dạ Tước và Dung Ân. Liệu họ có thể tìm thấy bình yên bên nhau?",
            views: 2900000,
            votes: 85000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 145,
            updateTime: "4 năm trước"
        },
        {
            id: 26,
            title: "Khủng Bố Sống Lại",
            author: "Phật Tiền Hiến Hoa",
            categories: ["Linh Dị", "Hệ Thống", "Đô Thị"],
            cover: "images/covers/khung-bo-song-lai.jpg",
            description: "Ngũ trọc ác thế, địa ngục đã trống, ác quỷ khôi phục, nhân gian như ngục... Dương Gian mang theo một tấm da người quỷ dị, bước vào con đường giải quyết những sự kiện siêu nhiên đầy ám ảnh.",
            views: 4500000,
            votes: 110000,
            status: "Đang ra",
            isHot: true,
            latestChapter: 1540,
            updateTime: "5 giờ trước"
        },
        {
            id: 27,
            title: "Thứ Nữ Hữu Độc",
            author: "Tần Giản",
            categories: ["Gia Đấu", "Nữ Cường", "Trọng Sinh", "Cung Đấu"],
            cover: "images/covers/thu-nu-huu-doc.jpg",
            description: "Kiếp trước chịu đủ mọi sự sỉ nhục và phản bội, kiếp này Lý Vị Ương mang tâm thế của quỷ tu la, từng bước báo thù những kẻ đã hãm hại mình, làm khuynh đảo cả hoàng triều.",
            views: 3100000,
            votes: 88000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 294,
            updateTime: "4 năm trước"
        },
        {
            id: 28,
            title: "Thiếu Gia Ác Ma Đừng Hôn Tôi",
            author: "Cẩm Hạ Mạt",
            categories: ["Truyện Teen", "Hiện Đại", "Ngôn Tình"],
            cover: "images/covers/thieu-gia-ac-doc.jpg",
            description: "Cô gái bình dân An Sơ Hạ bất ngờ bước vào ngôi trường quý tộc và trở thành mục tiêu bắt nạt của vị thiếu gia ác ma Hàn Thất Lục, bắt đầu câu chuyện oan gia ngõ hẹp.",
            views: 2600000,
            votes: 75000,
            status: "Hoàn thành",
            isHot: false,
            latestChapter: 1042,
            updateTime: "3 năm trước"
        },
        {
            id: 29,
            title: "Mười Tội Ác (Thập Tông Tội)",
            author: "Tri Thù",
            categories: ["Trinh Thám", "Hiện Đại", "Linh Dị"],
            cover: "images/covers/thap-tong-toi.jpg",
            description: "Tuyển tập những vụ án giết người rùng rợn và tàn bạo nhất, dựa trên các sự kiện có thật, thử thách lòng can đảm và trí tuệ của tổ chuyên án.",
            views: 3900000,
            votes: 102000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 60,
            updateTime: "2 năm trước"
        },
        {
            id: 30,
            title: "Nữ Phụ Ác Độc Mỉm Cười Cả Nhà Liền Phát Lạnh",
            author: "Vô Danh",
            categories: ["Nữ Phụ", "Hệ Thống", "Hiện Đại", "Hài Hước"],
            cover: "images/covers/nu-phu.jpg",
            description: "Xuyên thành nữ phụ phản diện chỉ sống được 3 chương, nàng quyết định dùng kịch bản tấu hài và hệ thống kỳ quái để quậy tung cả cốt truyện, khiến nam nữ chính phải hoài nghi nhân sinh.",
            views: 1800000,
            votes: 56000,
            status: "Đang ra",
            isHot: false,
            latestChapter: 325,
            updateTime: "1 ngày trước"
        },
        {
            id: 31,
            title: "Kiếm Lai",
            author: "Phong Hỏa Hí Chư Hầu",
            categories: ["Tiên Hiệp", "Kiếm Hiệp", "Huyền Huyễn"],
            cover: "images/covers/kiem-lai.jpg",
            description: "Đại thế giới ngập tràn kiếm khí, thiếu niên Trần Bình An từ một tiểu trấn nghèo khó, từng bước nắm giữ kiếm đạo, chém vỡ gông cùm của trời đất.",
            views: 6200000,
            votes: 145000,
            status: "Đang ra",
            isHot: true,
            latestChapter: 1108,
            updateTime: "2 giờ trước"
        },
        {
            id: 32,
            title: "Thôn Phệ Tinh Không",
            author: "Ngã Ăn Tây Hồng Thị",
            categories: ["Khoa Huyễn", "Mạt Thế", "Dị Giới"],
            cover: "images/covers/thon-phe-tinh-khong.jpg",
            description: "Trái Đất trải qua thảm họa biến đổi gen, La Phong một thiếu niên bình thường quật khởi từ vi vi, vượt qua ranh giới hành tinh, chinh phục vũ trụ mênh mông.",
            views: 7100000,
            votes: 210000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1486,
            updateTime: "7 năm trước"
        },
        {
            id: 33,
            title: "Nhân Vật Phản Diện Này Có Chút Lương Tâm, Nhưng Không Nhiều!",
            author: " ",
            categories: ["Tiên Hiệp", "Huyền Huyễn", "Hệ Thống", "Trọng Sinh", "Xuyên Không"],
            cover: "images/covers/nhan-vat-phan-dien-nay-co-chut-luong-tam-nhung-khong-nhieu.jpg",
            description: "Tần Phong ngoài ý muốn xuyên qua Hoang Cổ trở thành đại thiếu gia bá chủ Tần gia một phương, vốn tưởng rằng từ đó liền có thể sống cuộc sống phú nhị đại muốn gì nằm bằng, nào ngờ song sinh nhị đệ lại là con trai thiên tuyển cấp sử thi, mình lại là thiên mệnh đại phản diện, vì có thể sống sót, chỉ có thể dựa vào hệ thống cố gắng phấn đấu!",
            views: 4800000,
            votes: 160000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 2089,
            updateTime: "1 năm trước"
        },
        {
            id: 34,
            title: "Linh Cảnh Hành Giả",
            author: "Mại Báo Tiểu Lang Quân",
            categories: ["Khoa Huyễn", "Linh Dị", "Đô Thị", "Võng Du"],
            cover: "images/covers/linh-hanh.jpg",
            description: "Một bưu kiện kỳ lạ gửi đến thẻ thông hành tiến vào 'Linh Cảnh', thế giới thực giao thoa với cõi tâm linh rùng rợn, Trương Nguyên Thanh bắt đầu hành trình trở thành hành giả mạnh nhất.",
            views: 5300000,
            votes: 185000,
            status: "Đang ra",
            isHot: true,
            latestChapter: 980,
            updateTime: "30 phút trước"
        },
        {
            id: 35,
            title: "Toàn Dân Hải Đảo Cầu Sinh: Ta Có Thể Nghe Được Vạn Vật Tiếng Lòng",
            author: "Ngàn Năm Nhất Mộng",
            categories: ["Ngôn Tình", "Huyền Huyễn", "Đô Thị", "Mạt Thế", "Khác"],
            cover: "images/covers/ta-co-the-nghe-duoc-van-vat-tieng-long.jpg",
            description: "Về toàn dân hải đảo cầu sinh: Ta có thể nghe được vạn vật tiếng lòng: Hàn phong nhân soái bị phán xử tù có thời hạn 1000 năm, sung quân đến 10086 cầu sinh khu một tòa hải đảo thượng, cùng ba cái xinh đẹp như hoa người chơi nữ cùng nhau tham gia cầu sinh trò chơi. Khai cục đạt được cùng vạn vật câu thông năng lực. Phàm là cùng hắn câu thông vật phẩm, đều có thể mở ra linh trí, cũng có được thăng cấp năng lực. Nhà tranh cắn nuốt cỏ tranh, cuối cùng thăng cấp thành sao trời thành lũy. Công binh sạn cắn nuốt kim loại vật chất, cuối cùng thăng cấp thành hỗn độn khai sơn sạn. Mộc hàng rào cắn nuốt bó củi, cuối cùng thăng cấp thành bất diệt trường thành. Bình thường dao phay cắn nuốt kim loại vật chất, cuối cùng thăng cấp thành hỗn nguyên Đồ Long đao. Đương người chơi khác còn ở giãy giụa cầu sinh thời điểm, Hàn phong bên người mỹ nữ vờn quanh, quá thích ý nhàn nhã sinh hoạt. Hàn phong: Các vị người chơi nữ thỉnh tự trọng, ta là một cái người đứng đắn!",
            views: 1200000,
            votes: 35000,
            status: "Hoàn thành",
            isHot: true,
            latestChapter: 1050,
            updateTime: "1 năm trước"
        },
        {
            id: 36,
            title: "Đại Càn Trấn Yêu Ty",
            author: "Vô Khuyết",
            categories: ["Linh Dị", "Tiên Hiệp", "Dị Giới"],
            cover: "images/covers/dai-can-tran-yeu-ty.jpg",
            description: "Nắm giữ trong tay tòa bảo tháp nhốt vạn vạn yêu ma đồ thán nhân gian, thiếu niên Lý Tu đạo tâm kiên định, chém yêu trừ ma, bảo vệ sự bình yên của phố thị.",
            views: 2300000,
            votes: 52000,
            status: "Đang ra",
            isHot: false,
            latestChapter: 845,
            updateTime: "12 giờ trước"
        }
    ];
// ==========================================
// CÁC HÀM QUẢN LÝ DATABASE BẰNG LOCALSTORAGE
// ==========================================

// Lấy dữ liệu từ LocalStorage (Nếu chưa có thì lấy mảng initData nạp vào)
function getDatabase() {
    let db = localStorage.getItem('STORIES_DB');
    if (!db) {
        localStorage.setItem('STORIES_DB', JSON.stringify(initData));
        return initData;
    }
    return JSON.parse(db);
}

// Lưu dữ liệu mới đè lên LocalStorage (Dùng khi thêm/sửa/xóa truyện bên trang Admin)
function saveDatabase(newData) {
    localStorage.setItem('STORIES_DB', JSON.stringify(newData));
    window.appDB = newData;
}

// KHỞI TẠO BIẾN TOÀN CỤC KHI CHẠY WEB
window.appDB = getDatabase();

// ==============================================================
// XỬ LÝ ẨN/HIỆN NÚT ĐĂNG NHẬP HOẶC ADMIN TRÊN NAVBAR TOÀN HỆ THỐNG
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('nav-auth-section');
    
    if (authSection) {
        const isLoggedIn = localStorage.getItem('IS_LOGGED_IN');
        
        if (isLoggedIn === 'true') {
            authSection.innerHTML = `
                <a href="dashboard.html" class="btn btn-warning btn-sm fw-bold"><i class="fas fa-shield-halved me-1"></i> Admin</a>
                <button id="btn-global-logout" class="btn btn-outline-danger btn-sm" title="Đăng xuất"><i class="fas fa-sign-out-alt"></i></button>
            `;
            
            document.getElementById('btn-global-logout').addEventListener('click', () => {
                if(confirm("Bạn muốn đăng xuất?")) {
                    localStorage.removeItem('IS_LOGGED_IN');
                    window.location.reload(); 
                }
            });
        } else {
            authSection.innerHTML = `
                <a href="login.html" class="btn btn-outline-light btn-sm"><i class="fas fa-user me-1"></i> Đăng nhập</a>
            `;
        }
    }
});
// ==============================================================
// XỬ LÝ FORM TÌM KIẾM NÂNG CAO
// ==============================================================
// ==============================================================
// XỬ LÝ FORM TÌM KIẾM NÂNG CAO (PHIÊN BẢN GIAO DIỆN GRID)
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('advanced-search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            // Lấy từ khóa (Gộp chung tên và tác giả)
            const keyword = document.getElementById('search-keyword').value.trim();
            
            // Lấy Radio Button được chọn
            const sort = document.querySelector('input[name="sort"]:checked').value;
            const status = document.querySelector('input[name="status"]:checked').value;
            const chap = document.querySelector('input[name="chap"]:checked').value;
            
            // Lấy tất cả Checkbox thể loại được tick
            const checkedCats = Array.from(document.querySelectorAll('.cat-check:checked')).map(cb => cb.value).join(',');

            const searchModal = bootstrap.Modal.getInstance(document.getElementById('searchModal'));
            if(searchModal) searchModal.hide();

            // Chuyển hướng
            const queryURL = `tim-kiem.html?keyword=${encodeURIComponent(keyword)}&sort=${sort}&status=${encodeURIComponent(status)}&chap=${chap}&cats=${encodeURIComponent(checkedCats)}`;
            window.location.href = queryURL;
        });
    }
});
// Ép trình duyệt xóa DB cũ và nạp lại 25 truyện mới

// ==============================================================
// ==============================================================
// TỰ ĐỘNG LIÊN KẾT CHỮ VÀ Ô CHECKBOX / RADIO (TỐI ƯU UX)
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả các cụm chứa ô bấm (cả vuông và tròn) trên màn hình
    const allFormChecks = document.querySelectorAll('.form-check');
    
    allFormChecks.forEach((checkDiv, index) => {
        // Quét tìm cả checkbox (Thể loại) và radio (Sắp xếp, Tình trạng, Số chương)
        const input = checkDiv.querySelector('input[type="checkbox"], input[type="radio"]');
        const label = checkDiv.querySelector('label');
        
        // Nếu tìm thấy cả ô và chữ, nhưng ô chưa có ID
        if (input && label && !input.id) {
            const uniqueId = 'auto-input-' + index; // Tạo ra 1 cái tên duy nhất
            input.id = uniqueId;                    // Gắn vào ô (vuông/tròn)
            label.setAttribute('for', uniqueId);    // Nối chữ vào ô đó
        }
    });
});